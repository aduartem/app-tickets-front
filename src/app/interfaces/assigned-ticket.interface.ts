export interface AssignedTicketInterface {
  id: number;
  subject: string;
  description: string;
  creator_user: string;
  assigned_user: string;
  status_id: number;
  status_name: string;
  assignment_date: string;
  resolution_date: string;
  createdAt: string;
}
