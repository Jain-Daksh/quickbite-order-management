import { setupOrderAssociation } from './order.association';
import { setupOrderItemAssociation } from './orderItem.association';
import { setupMenuItemAssociation } from './menuItem.association';

export const initializeAssociations = () => {
  setupOrderAssociation();
  setupOrderItemAssociation();
  setupMenuItemAssociation();
};
