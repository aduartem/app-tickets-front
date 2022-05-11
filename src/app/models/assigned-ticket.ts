export class AssignedTicket {
  constructor(
    public id: number,
    public subject: string,
    public description: string,
    public creator_user: string,
    public assigned_user: string,
    public status_id: number,
    public status_name: string,
    public assignment_date: string,
    public resolution_date: string,
    public createdAt: string
  ) {}
}
