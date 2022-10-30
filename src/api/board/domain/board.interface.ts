import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { UserRole } from 'src/api/user/domain/user.enum';

export type IBoardId = number;

export type IBoardResponse = Pick<
  IBoardProperty,
  'id' | 'title' | 'read_access' | 'write_access'
>;

export interface IBoardProperty extends BaseAggregate<IBoardId> {
  readonly title: string;
  readonly announcement: boolean;
  readonly read_access: UserRole;
  readonly write_access: UserRole;
}

export type IBoardMethod = {
  setTitle: (title: string) => void;
  setAnnouncement: (announcement: boolean) => void;
  setReadAccess: (role: UserRole) => void;
  setWriteAccess: (role: UserRole) => void;
  getResponse: () => IBoardResponse;
};

export type IBoard = IBoardProperty & IBoardMethod;

export type IBoardProps = Pick<
  IBoardProperty,
  'title' | 'announcement' | 'read_access' | 'write_access'
> &
  Partial<Pick<IBoardProperty, 'id' | 'created_at' | 'updated_at'>>;
