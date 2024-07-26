import { BaseEntity } from "../../shared/entity/base-identity";
import { ROLE } from "../enums/role";
import { Optional } from "@/shared/optional";
import { randomUUID } from "node:crypto";

interface Props {
  id: string;
  name: string;
  email: string;
  password: string;
  role: ROLE;
  created_at: Date;
  updated_at?: Date;
}

export class User extends BaseEntity<Props> {
  static create(props: Optional<Props, "id" | "created_at">) {
    const user = new User({
      ...props,
      id: props.id || randomUUID(),
      created_at: props.created_at ?? new Date(),
    });

    return user;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  private touch() {
    this.props.updated_at = new Date();
  }

  public update({ name, password }: Props) {
    Object.assign(this, { name, password });
    this.touch();
  }
}
