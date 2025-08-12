import { Priority, Status } from "@/states/api";
import colors from "tailwindcss/colors";

export const statusBubbles: Record<Status, string[]> = {
  [Status.ToDo]: [colors.orange[700], colors.orange[200]],
  [Status.UnderReview]: [colors.fuchsia[700], colors.fuchsia[200]],
  [Status.Postponed]: [colors.yellow[700], colors.yellow[200]],
  [Status.InProgress]: [colors.blue[700], colors.blue[200]],
  [Status.Completed]: [colors.green[700], colors.green[200]],
};

export const statusColors: Record<Status, string> = {
  [Status.ToDo]: colors.orange[300],
  [Status.UnderReview]: colors.fuchsia[400],
  [Status.Postponed]: colors.yellow[400],
  [Status.InProgress]: colors.blue[400],
  [Status.Completed]: colors.green[600],
};

export const priorityBubbles: Record<Priority, string[]> = {
  [Priority.Backlog]: [colors.gray[700], colors.gray[200]],
  [Priority.Urgent]: [colors.red[700], colors.red[200]],
  [Priority.High]: [colors.yellow[700], colors.yellow[200]],
  [Priority.Medium]: [colors.green[700], colors.green[200]],
  [Priority.Low]: [colors.blue[700], colors.blue[200]],
};

export const priorityColors: Record<string, string[]> = {
  Urgent: [colors.red[700], colors.red[200]],
  High: [colors.yellow[700], colors.yellow[200]],
  Medium: [colors.green[700], colors.green[200]],
  Low: [colors.blue[700], colors.blue[200]],
};
