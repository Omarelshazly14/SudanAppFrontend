export interface ILeave {
  id: number;
  startDate?: string;
  endDate?: string;
  numberOfDays?: number;
  reviewDecision?: boolean;
  reviewRejectReason?: string;
  approvalDecision?: boolean;
  approvalRejectReason?: string;
  notes?: string;
}
