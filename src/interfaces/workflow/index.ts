import { BusinessOrganizationInterface } from 'interfaces/business-organization';

export interface WorkflowInterface {
  id?: string;
  business_organization_id: string;
  name: string;
  steps: string;

  business_organization?: BusinessOrganizationInterface;
  _count?: {};
}
