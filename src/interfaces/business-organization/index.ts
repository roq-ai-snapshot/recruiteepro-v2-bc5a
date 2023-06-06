import { JobOpeningInterface } from 'interfaces/job-opening';
import { WorkflowInterface } from 'interfaces/workflow';
import { UserInterface } from 'interfaces/user';

export interface BusinessOrganizationInterface {
  id?: string;
  name: string;
  user_id: string;
  job_opening?: JobOpeningInterface[];
  workflow?: WorkflowInterface[];
  user?: UserInterface;
  _count?: {
    job_opening?: number;
    workflow?: number;
  };
}
