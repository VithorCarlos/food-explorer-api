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
  createdAt: Date;
  udpatedAt?: Date;
}

interface SaveUserProps {
  name?: string;
  email?: string;
  password?: string;
}

export class User extends BaseEntity<UserProps> {
  static create(props: Optional<UserProps, "id" | "createdAt" | "role">) {
    return new User({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
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

  get createdAt() {
    return this.props.createdAt;
  }

  get udpatedAt() {
    return this.props.udpatedAt;
  }

  private touch() {
    this.props.udpatedAt = new Date();
  }

  public update({ name, password, email }: SaveUserProps) {
    this.props.name = name ?? this.name;
    this.props.password = password ?? this.password;
    this.props.email = email ?? this.email;

    this.touch();
  }
}
