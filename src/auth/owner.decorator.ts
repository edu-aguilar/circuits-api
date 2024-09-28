import { UseGuards } from '@nestjs/common';
import { OwnerGuard } from './owner.guard';

export function Owner() {
  return UseGuards(OwnerGuard);
}
