import { BaseAggregate } from 'src/api/common/model/aggregate.base';
import { roleLevel, UserRole } from 'src/api/user/domain/user.enum';
import {
  IBoard,
  IBoardId,
  IBoardProps,
  IBoardResponse,
} from './board.interface';

export class Board extends BaseAggregate<IBoardId> implements IBoard {
  private constructor(
    id: IBoardId,
    readonly title: string,
    readonly announcement: boolean,
    readonly read_access: UserRole,
    readonly write_access: UserRole,
    created_at: Date,
    updated_at: Date,
  ) {
    super(id, created_at, updated_at);
  }

  static get(props: IBoardProps): IBoard {
    const {
      id,
      created_at,
      updated_at,
      title,
      announcement,
      read_access,
      write_access,
    } = props;
    const now = new Date();
    return new Board(
      id ?? 0,
      title,
      announcement,
      read_access,
      write_access,
      created_at ?? now,
      updated_at ?? now,
    );
  }

  getResponse(): IBoardResponse {
    const { id, title, read_access, write_access } = this;
    return { id, title, read_access, write_access };
  }

  setTitle(title: string): void {
    (this as any).title = title;
    return;
  }
  setAnnouncement(announcement: boolean): void {
    (this as any).announcement = announcement;
    return;
  }
  setReadAccess(role: UserRole): void {
    (this as any).read_access = role;
    return;
  }
  setWriteAccess(role: UserRole): void {
    (this as any).write_access = role;
    return;
  }

  checkPermission(role: UserRole, scope: 'read' | 'write'): boolean {
    const userLevel = roleLevel[role];
    const boardLevel =
      scope === 'read'
        ? roleLevel[this.read_access]
        : roleLevel[this.write_access];
    return userLevel <= boardLevel;
  }
}
