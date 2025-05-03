import { Grid2, Card, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteDialog from "../components/dialogs/DeleteDialog";
import TopicCard from "../components/TopicCard";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";

import { useTopics } from "../hooks/useTopics";
import { checkDifficulty } from "../utils/utils";
import { useCookies } from "react-cookie";
import { useUser } from "../hooks/useUser";
import { useBonuses } from "../hooks/useBonuses";
import BonusCard from "../components/BonusCard";

/**
 * A React component that renders the profile page.
 *
 * @returns The rendered ProfilePage component.
 */
export default function ProfilePage() {
  const [open, setOpen] = React.useState(false);
  const [cookies] = useCookies(["userInfo", "progress"]);

  const { user } = useUser();
  const { bonuses, loading: bonusLoading, error: bonusError } = useBonuses();

  const deleteButtonRef = React.useRef<HTMLButtonElement>(null);

  const [topicIds, setTopicIds] = useState<number[]>([]);
  const { topics: data, loading, error, refetch } = useTopics();
  useEffect(() => {
    const savedTopicIds = cookies.userInfo?.topicIds || [];
    setTopicIds(savedTopicIds);
  }, [cookies.userInfo]);

  useEffect(() => {
    if (topicIds.length === 0) return;

    let isMounted = true;
    refetch(topicIds).finally(() => {
      if (!isMounted) return;
    });

    return () => {
      isMounted = false;
    };
  }, [topicIds, refetch]);

  const sortedTopics = {
    ingen: data.filter(
      (topic) => checkDifficulty(topic.skillLevel) === "ingen"
    ),
    litt: data.filter((topic) => checkDifficulty(topic.skillLevel) === "litt"),
    mye: data.filter((topic) => checkDifficulty(topic.skillLevel) === "mye"),
  };

  if (loading || bonusLoading) {
    return <div>Loading...</div>;
  }
  if (error || bonusError) {
    return <div>Error loading topics/bonuses</div>;
  }

  return (
    <>
      <DeleteDialog
        open={open}
        onClose={() => {
          setOpen(false);
          deleteButtonRef.current?.focus();
        }}
      />
      <div {...(open ? { inert: true } : {})}>
        <Grid2 className="flex flex-col justify-center items-center space-y-4 w-full">
          <Typography variant="h4" className="pb-6">
            Min side
          </Typography>
          <Grid2 className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Card
              className="flex flex-col items-center justify-center w-80 text-center p-6 border-1 border-black"
              sx={{ borderRadius: 6 }}
            >
              <Typography variant="h6">Du har oppnådd totalt</Typography>
              <Typography variant="h6">
                {user?.allUserPoints || 0} poeng!
              </Typography>
              <Grid2 className="flex justify-center items-center space-x-2 py-2">
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <OfflineBoltOutlinedIcon
                      key={i}
                      fontSize="large"
                      className="bg-yellow-300 rounded-full border-2"
                    />
                  ))}
              </Grid2>
              <Typography variant="h6">Stå på!!</Typography>
            </Card>

            <Card
              className="flex flex-col max-w-111 items-center justify-center content-center text-center p-2 border-1 border-black"
              sx={{ borderRadius: 6 }}
            >
              <Typography variant="h5" className="pb-2">
                Oversikt temaer
              </Typography>
              <Grid2 className="flex flex-col md:flex-row justify-center items-center flex-wrap gap-2">
                {(["ingen", "litt", "mye"] as const).flatMap((difficulty) =>
                  sortedTopics[difficulty].map((topic) => {
                    return (
                      <Grid2 size={6} key={topic.id}>
                        <TopicCard
                          cardTitle={topic.title}
                          cardIcon={topic.icon}
                          difficulty={checkDifficulty(topic.skillLevel)}
                          progress={cookies.progress?.[topic.id] || 0}
                          size="small"
                        />
                      </Grid2>
                    );
                  })
                )}
              </Grid2>
            </Card>
          </Grid2>
          <Grid2 className="flex flex-col-reverse md:flex-row-reverse justify-center items-center gap-4">
            <Card
              className="flex flex-col items-center justify-center w-90 text-center p-5 border-1 border-black"
              sx={{ borderRadius: 6 }}
            >
              <Typography variant="body1" className="pb-4">
                Denne nettsiden lagrer informasjon om hvor langt du har kommet
                og hvilke bonuser du har nådd. Dersom du ikke ønsker at dette
                skal lagres videre, trykk slett min data.
              </Typography>

              <Button
                ref={deleteButtonRef}
                variant="contained"
                color="error"
                onClick={() => setOpen(true)}
              >
                Slett min data
              </Button>
            </Card>
            <Card
              className="flex flex-col gap-2 items-center justify-center text-center p-4 border-1 border-black "
              sx={{ borderRadius: 6 }}
            >
              <Typography variant="h5">Bonusoversikt!</Typography>
              <Grid2 className="flex flex-col justify-center items-center gap-2">
                {bonuses.map((bonus) => {
                  return (
                    <Grid2 key={bonus.id}>
                      <BonusCard
                        cardTitle={bonus.title}
                        cardIcon={bonus.icon}
                        description={bonus.description}
                        pointsNeeded={bonus.pointsNeeded}
                        pointsAchieved={user?.allUserPoints || 0}
                      />
                    </Grid2>
                  );
                })}
              </Grid2>
            </Card>
          </Grid2>
        </Grid2>
      </div>
    </>
  );
}
