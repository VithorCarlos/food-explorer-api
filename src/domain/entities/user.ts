import { $Enums } from "generated/prisma/client";
import { BaseEntity } from "../../shared/entity/base-identity";
import { ROLE } from "../enums/role";
import { Optional } from "@/shared/optional";
import { UniqueEntityId } from "@/shared/entity/unique-entity-id";

export interface UserProps {
  name: string;
  email: string;
  password: string;
  role: $Enums.ROLE;
  createdAt: Date;
  updatedAt?: Date | null;
}

interface SaveUserProps {
  name?: string;
  email?: string;
  password?: string;
}

export class User extends BaseEntity<UserProps> {
  static create(
    props: Optional<UserProps, "createdAt" | "role">,
    id?: UniqueEntityId,
  ) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        role: props.role ?? ROLE.ADMIN,
      },
      id,
    );

    return user;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  get role() {
    return this.props.role;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
