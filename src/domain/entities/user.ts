import { $Enums } from "generated/prisma/client";
import { BaseEntity } from "../../shared/entity/base-identity";
import { ROLE } from "../enums/role";
import { Optional } from "@/shared/optional";
import { randomUUID } from "node:crypto";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: $Enums.ROLE;
  created_at: Date;
  updated_at?: Date;
}

interface SaveUserProps {
  name?: string;
  email?: string;
  password?: string;
}

export class User extends BaseEntity<UserProps> {
  static create(props: Optional<UserProps, "id" | "created_at" | "role">) {
    return new User({
      ...props,
      id: props.id ?? randomUUID(),
      created_at: props.created_at ?? new Date(),
      role: props.role ?? ROLE.CLIENT,
    });
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

  public update({ name, password, email }: SaveUserProps) {
    this.props.name = name ?? this.name;
    this.props.password = password ?? this.password;
    this.props.email = email ?? this.email;

    this.touch();
  }
}
