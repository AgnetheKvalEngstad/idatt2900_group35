import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Homepage from "../../pages/Homepage";
import axiosInstance from "../../api/axios";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import "@testing-library/jest-dom";

import type { AxiosInstance } from "axios";

vi.mock("../../api/axios");

const mockedAxios = axiosInstance as jest.Mocked<AxiosInstance>;

const mockTopics = [
  { id: 1, title: "Intro to Cookies", skillLevel: "0", userId: 1 },
  { id: 2, title: "Advanced Cookies", skillLevel: "2", userId: 2 },
];

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Tests for Homepage component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading initially", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockTopics });

    renderWithRouter(<Homepage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("renders topic cards on success", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockTopics });

    renderWithRouter(<Homepage />);

    await waitFor(() => {
      expect(screen.getByText("Intro to Cookies")).toBeInTheDocument();
      expect(screen.getByText("Advanced Cookies")).toBeInTheDocument();
    });
  });

  it("shows error on failure", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    renderWithRouter(<Homepage />);

    await waitFor(() => {
      expect(screen.getByText("Error loading topics")).toBeInTheDocument();
    });
  });
});
