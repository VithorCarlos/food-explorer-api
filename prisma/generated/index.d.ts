
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model snacks
 * 
 */
export type snacks = $Result.DefaultSelection<Prisma.$snacksPayload>
/**
 * Model favorites
 * 
 */
export type favorites = $Result.DefaultSelection<Prisma.$favoritesPayload>
/**
 * Model refresh_tokens
 * 
 */
export type refresh_tokens = $Result.DefaultSelection<Prisma.$refresh_tokensPayload>
/**
 * Model attachment
 * 
 */
export type attachment = $Result.DefaultSelection<Prisma.$attachmentPayload>
/**
 * Model attachment_link
 * 
 */
export type attachment_link = $Result.DefaultSelection<Prisma.$attachment_linkPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ROLE: {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  RESTAURANT: 'RESTAURANT'
};

export type ROLE = (typeof ROLE)[keyof typeof ROLE]


export const RESOURSE_TYPE: {
  USER: 'USER',
  SNACK: 'SNACK'
};

export type RESOURSE_TYPE = (typeof RESOURSE_TYPE)[keyof typeof RESOURSE_TYPE]

}

export type ROLE = $Enums.ROLE

export const ROLE: typeof $Enums.ROLE

export type RESOURSE_TYPE = $Enums.RESOURSE_TYPE

export const RESOURSE_TYPE: typeof $Enums.RESOURSE_TYPE

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.snacks`: Exposes CRUD operations for the **snacks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Snacks
    * const snacks = await prisma.snacks.findMany()
    * ```
    */
  get snacks(): Prisma.snacksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favorites`: Exposes CRUD operations for the **favorites** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favorites
    * const favorites = await prisma.favorites.findMany()
    * ```
    */
  get favorites(): Prisma.favoritesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refresh_tokens`: Exposes CRUD operations for the **refresh_tokens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Refresh_tokens
    * const refresh_tokens = await prisma.refresh_tokens.findMany()
    * ```
    */
  get refresh_tokens(): Prisma.refresh_tokensDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attachment`: Exposes CRUD operations for the **attachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attachments
    * const attachments = await prisma.attachment.findMany()
    * ```
    */
  get attachment(): Prisma.attachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attachment_link`: Exposes CRUD operations for the **attachment_link** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attachment_links
    * const attachment_links = await prisma.attachment_link.findMany()
    * ```
    */
  get attachment_link(): Prisma.attachment_linkDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    snacks: 'snacks',
    favorites: 'favorites',
    refresh_tokens: 'refresh_tokens',
    attachment: 'attachment',
    attachment_link: 'attachment_link'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "snacks" | "favorites" | "refresh_tokens" | "attachment" | "attachment_link"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      snacks: {
        payload: Prisma.$snacksPayload<ExtArgs>
        fields: Prisma.snacksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.snacksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$snacksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.snacksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$snacksPayload>
          }
          findFirst: {
            args: Prisma.snacksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$snacksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.snacksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$snacksPayload>
          }
          findMany: {
            args: Prisma.snacksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$snacksPayload>[]
          }
          create: {
            args: Prisma.snacksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$snacksPayload>
          }
          createMany: {
            args: Prisma.snacksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.snacksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$snacksPayload>[]
          }
          delete: {
            args: Prisma.snacksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$snacksPayload>
          }
          update: {
            args: Prisma.snacksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$snacksPayload>
          }
          deleteMany: {
            args: Prisma.snacksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.snacksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.snacksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$snacksPayload>[]
          }
          upsert: {
            args: Prisma.snacksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$snacksPayload>
          }
          aggregate: {
            args: Prisma.SnacksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSnacks>
          }
          groupBy: {
            args: Prisma.snacksGroupByArgs<ExtArgs>
            result: $Utils.Optional<SnacksGroupByOutputType>[]
          }
          count: {
            args: Prisma.snacksCountArgs<ExtArgs>
            result: $Utils.Optional<SnacksCountAggregateOutputType> | number
          }
        }
      }
      favorites: {
        payload: Prisma.$favoritesPayload<ExtArgs>
        fields: Prisma.favoritesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.favoritesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$favoritesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.favoritesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$favoritesPayload>
          }
          findFirst: {
            args: Prisma.favoritesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$favoritesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.favoritesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$favoritesPayload>
          }
          findMany: {
            args: Prisma.favoritesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$favoritesPayload>[]
          }
          create: {
            args: Prisma.favoritesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$favoritesPayload>
          }
          createMany: {
            args: Prisma.favoritesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.favoritesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$favoritesPayload>[]
          }
          delete: {
            args: Prisma.favoritesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$favoritesPayload>
          }
          update: {
            args: Prisma.favoritesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$favoritesPayload>
          }
          deleteMany: {
            args: Prisma.favoritesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.favoritesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.favoritesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$favoritesPayload>[]
          }
          upsert: {
            args: Prisma.favoritesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$favoritesPayload>
          }
          aggregate: {
            args: Prisma.FavoritesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavorites>
          }
          groupBy: {
            args: Prisma.favoritesGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoritesGroupByOutputType>[]
          }
          count: {
            args: Prisma.favoritesCountArgs<ExtArgs>
            result: $Utils.Optional<FavoritesCountAggregateOutputType> | number
          }
        }
      }
      refresh_tokens: {
        payload: Prisma.$refresh_tokensPayload<ExtArgs>
        fields: Prisma.refresh_tokensFieldRefs
        operations: {
          findUnique: {
            args: Prisma.refresh_tokensFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokensPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.refresh_tokensFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokensPayload>
          }
          findFirst: {
            args: Prisma.refresh_tokensFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokensPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.refresh_tokensFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokensPayload>
          }
          findMany: {
            args: Prisma.refresh_tokensFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokensPayload>[]
          }
          create: {
            args: Prisma.refresh_tokensCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokensPayload>
          }
          createMany: {
            args: Prisma.refresh_tokensCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.refresh_tokensCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokensPayload>[]
          }
          delete: {
            args: Prisma.refresh_tokensDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokensPayload>
          }
          update: {
            args: Prisma.refresh_tokensUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokensPayload>
          }
          deleteMany: {
            args: Prisma.refresh_tokensDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.refresh_tokensUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.refresh_tokensUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokensPayload>[]
          }
          upsert: {
            args: Prisma.refresh_tokensUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokensPayload>
          }
          aggregate: {
            args: Prisma.Refresh_tokensAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefresh_tokens>
          }
          groupBy: {
            args: Prisma.refresh_tokensGroupByArgs<ExtArgs>
            result: $Utils.Optional<Refresh_tokensGroupByOutputType>[]
          }
          count: {
            args: Prisma.refresh_tokensCountArgs<ExtArgs>
            result: $Utils.Optional<Refresh_tokensCountAggregateOutputType> | number
          }
        }
      }
      attachment: {
        payload: Prisma.$attachmentPayload<ExtArgs>
        fields: Prisma.attachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.attachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.attachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachmentPayload>
          }
          findFirst: {
            args: Prisma.attachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.attachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachmentPayload>
          }
          findMany: {
            args: Prisma.attachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachmentPayload>[]
          }
          create: {
            args: Prisma.attachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachmentPayload>
          }
          createMany: {
            args: Prisma.attachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.attachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachmentPayload>[]
          }
          delete: {
            args: Prisma.attachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachmentPayload>
          }
          update: {
            args: Prisma.attachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachmentPayload>
          }
          deleteMany: {
            args: Prisma.attachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.attachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.attachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachmentPayload>[]
          }
          upsert: {
            args: Prisma.attachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachmentPayload>
          }
          aggregate: {
            args: Prisma.AttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttachment>
          }
          groupBy: {
            args: Prisma.attachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.attachmentCountArgs<ExtArgs>
            result: $Utils.Optional<AttachmentCountAggregateOutputType> | number
          }
        }
      }
      attachment_link: {
        payload: Prisma.$attachment_linkPayload<ExtArgs>
        fields: Prisma.attachment_linkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.attachment_linkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachment_linkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.attachment_linkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachment_linkPayload>
          }
          findFirst: {
            args: Prisma.attachment_linkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachment_linkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.attachment_linkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachment_linkPayload>
          }
          findMany: {
            args: Prisma.attachment_linkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachment_linkPayload>[]
          }
          create: {
            args: Prisma.attachment_linkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachment_linkPayload>
          }
          createMany: {
            args: Prisma.attachment_linkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.attachment_linkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachment_linkPayload>[]
          }
          delete: {
            args: Prisma.attachment_linkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachment_linkPayload>
          }
          update: {
            args: Prisma.attachment_linkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachment_linkPayload>
          }
          deleteMany: {
            args: Prisma.attachment_linkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.attachment_linkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.attachment_linkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachment_linkPayload>[]
          }
          upsert: {
            args: Prisma.attachment_linkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attachment_linkPayload>
          }
          aggregate: {
            args: Prisma.Attachment_linkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttachment_link>
          }
          groupBy: {
            args: Prisma.attachment_linkGroupByArgs<ExtArgs>
            result: $Utils.Optional<Attachment_linkGroupByOutputType>[]
          }
          count: {
            args: Prisma.attachment_linkCountArgs<ExtArgs>
            result: $Utils.Optional<Attachment_linkCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    snacks?: snacksOmit
    favorites?: favoritesOmit
    refresh_tokens?: refresh_tokensOmit
    attachment?: attachmentOmit
    attachment_link?: attachment_linkOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    snacks: number
    favorite: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snacks?: boolean | UsersCountOutputTypeCountSnacksArgs
    favorite?: boolean | UsersCountOutputTypeCountFavoriteArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountSnacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: snacksWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountFavoriteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: favoritesWhereInput
  }


  /**
   * Count Type SnacksCountOutputType
   */

  export type SnacksCountOutputType = {
    favorite: number
  }

  export type SnacksCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    favorite?: boolean | SnacksCountOutputTypeCountFavoriteArgs
  }

  // Custom InputTypes
  /**
   * SnacksCountOutputType without action
   */
  export type SnacksCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnacksCountOutputType
     */
    select?: SnacksCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SnacksCountOutputType without action
   */
  export type SnacksCountOutputTypeCountFavoriteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: favoritesWhereInput
  }


  /**
   * Count Type AttachmentCountOutputType
   */

  export type AttachmentCountOutputType = {
    links: number
  }

  export type AttachmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    links?: boolean | AttachmentCountOutputTypeCountLinksArgs
  }

  // Custom InputTypes
  /**
   * AttachmentCountOutputType without action
   */
  export type AttachmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentCountOutputType
     */
    select?: AttachmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AttachmentCountOutputType without action
   */
  export type AttachmentCountOutputTypeCountLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attachment_linkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.ROLE | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.ROLE | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: $Enums.ROLE
    created_at: Date
    updated_at: Date
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
    snacks?: boolean | users$snacksArgs<ExtArgs>
    favorite?: boolean | users$favoriteArgs<ExtArgs>
    refresh_token?: boolean | users$refresh_tokenArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "created_at" | "updated_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snacks?: boolean | users$snacksArgs<ExtArgs>
    favorite?: boolean | users$favoriteArgs<ExtArgs>
    refresh_token?: boolean | users$refresh_tokenArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      snacks: Prisma.$snacksPayload<ExtArgs>[]
      favorite: Prisma.$favoritesPayload<ExtArgs>[]
      refresh_token: Prisma.$refresh_tokensPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: $Enums.ROLE
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    snacks<T extends users$snacksArgs<ExtArgs> = {}>(args?: Subset<T, users$snacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorite<T extends users$favoriteArgs<ExtArgs> = {}>(args?: Subset<T, users$favoriteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refresh_token<T extends users$refresh_tokenArgs<ExtArgs> = {}>(args?: Subset<T, users$refresh_tokenArgs<ExtArgs>>): Prisma__refresh_tokensClient<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'ROLE'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.snacks
   */
  export type users$snacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksInclude<ExtArgs> | null
    where?: snacksWhereInput
    orderBy?: snacksOrderByWithRelationInput | snacksOrderByWithRelationInput[]
    cursor?: snacksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SnacksScalarFieldEnum | SnacksScalarFieldEnum[]
  }

  /**
   * users.favorite
   */
  export type users$favoriteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
    where?: favoritesWhereInput
    orderBy?: favoritesOrderByWithRelationInput | favoritesOrderByWithRelationInput[]
    cursor?: favoritesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoritesScalarFieldEnum | FavoritesScalarFieldEnum[]
  }

  /**
   * users.refresh_token
   */
  export type users$refresh_tokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensInclude<ExtArgs> | null
    where?: refresh_tokensWhereInput
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model snacks
   */

  export type AggregateSnacks = {
    _count: SnacksCountAggregateOutputType | null
    _avg: SnacksAvgAggregateOutputType | null
    _sum: SnacksSumAggregateOutputType | null
    _min: SnacksMinAggregateOutputType | null
    _max: SnacksMaxAggregateOutputType | null
  }

  export type SnacksAvgAggregateOutputType = {
    price: number | null
  }

  export type SnacksSumAggregateOutputType = {
    price: number | null
  }

  export type SnacksMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    category: string | null
    price: number | null
    created_at: Date | null
    updated_at: Date | null
    userId: string | null
  }

  export type SnacksMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    category: string | null
    price: number | null
    created_at: Date | null
    updated_at: Date | null
    userId: string | null
  }

  export type SnacksCountAggregateOutputType = {
    id: number
    title: number
    description: number
    category: number
    ingredients: number
    price: number
    created_at: number
    updated_at: number
    userId: number
    _all: number
  }


  export type SnacksAvgAggregateInputType = {
    price?: true
  }

  export type SnacksSumAggregateInputType = {
    price?: true
  }

  export type SnacksMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    price?: true
    created_at?: true
    updated_at?: true
    userId?: true
  }

  export type SnacksMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    price?: true
    created_at?: true
    updated_at?: true
    userId?: true
  }

  export type SnacksCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    ingredients?: true
    price?: true
    created_at?: true
    updated_at?: true
    userId?: true
    _all?: true
  }

  export type SnacksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which snacks to aggregate.
     */
    where?: snacksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of snacks to fetch.
     */
    orderBy?: snacksOrderByWithRelationInput | snacksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: snacksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` snacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` snacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned snacks
    **/
    _count?: true | SnacksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SnacksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SnacksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SnacksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SnacksMaxAggregateInputType
  }

  export type GetSnacksAggregateType<T extends SnacksAggregateArgs> = {
        [P in keyof T & keyof AggregateSnacks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSnacks[P]>
      : GetScalarType<T[P], AggregateSnacks[P]>
  }




  export type snacksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: snacksWhereInput
    orderBy?: snacksOrderByWithAggregationInput | snacksOrderByWithAggregationInput[]
    by: SnacksScalarFieldEnum[] | SnacksScalarFieldEnum
    having?: snacksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SnacksCountAggregateInputType | true
    _avg?: SnacksAvgAggregateInputType
    _sum?: SnacksSumAggregateInputType
    _min?: SnacksMinAggregateInputType
    _max?: SnacksMaxAggregateInputType
  }

  export type SnacksGroupByOutputType = {
    id: string
    title: string
    description: string
    category: string
    ingredients: string[]
    price: number
    created_at: Date
    updated_at: Date
    userId: string
    _count: SnacksCountAggregateOutputType | null
    _avg: SnacksAvgAggregateOutputType | null
    _sum: SnacksSumAggregateOutputType | null
    _min: SnacksMinAggregateOutputType | null
    _max: SnacksMaxAggregateOutputType | null
  }

  type GetSnacksGroupByPayload<T extends snacksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SnacksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SnacksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SnacksGroupByOutputType[P]>
            : GetScalarType<T[P], SnacksGroupByOutputType[P]>
        }
      >
    >


  export type snacksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    ingredients?: boolean
    price?: boolean
    created_at?: boolean
    updated_at?: boolean
    userId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    favorite?: boolean | snacks$favoriteArgs<ExtArgs>
    _count?: boolean | SnacksCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["snacks"]>

  export type snacksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    ingredients?: boolean
    price?: boolean
    created_at?: boolean
    updated_at?: boolean
    userId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["snacks"]>

  export type snacksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    ingredients?: boolean
    price?: boolean
    created_at?: boolean
    updated_at?: boolean
    userId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["snacks"]>

  export type snacksSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    ingredients?: boolean
    price?: boolean
    created_at?: boolean
    updated_at?: boolean
    userId?: boolean
  }

  export type snacksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "category" | "ingredients" | "price" | "created_at" | "updated_at" | "userId", ExtArgs["result"]["snacks"]>
  export type snacksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    favorite?: boolean | snacks$favoriteArgs<ExtArgs>
    _count?: boolean | SnacksCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type snacksIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type snacksIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $snacksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "snacks"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
      favorite: Prisma.$favoritesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      category: string
      ingredients: string[]
      price: number
      created_at: Date
      updated_at: Date
      userId: string
    }, ExtArgs["result"]["snacks"]>
    composites: {}
  }

  type snacksGetPayload<S extends boolean | null | undefined | snacksDefaultArgs> = $Result.GetResult<Prisma.$snacksPayload, S>

  type snacksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<snacksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SnacksCountAggregateInputType | true
    }

  export interface snacksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['snacks'], meta: { name: 'snacks' } }
    /**
     * Find zero or one Snacks that matches the filter.
     * @param {snacksFindUniqueArgs} args - Arguments to find a Snacks
     * @example
     * // Get one Snacks
     * const snacks = await prisma.snacks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends snacksFindUniqueArgs>(args: SelectSubset<T, snacksFindUniqueArgs<ExtArgs>>): Prisma__snacksClient<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Snacks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {snacksFindUniqueOrThrowArgs} args - Arguments to find a Snacks
     * @example
     * // Get one Snacks
     * const snacks = await prisma.snacks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends snacksFindUniqueOrThrowArgs>(args: SelectSubset<T, snacksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__snacksClient<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Snacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {snacksFindFirstArgs} args - Arguments to find a Snacks
     * @example
     * // Get one Snacks
     * const snacks = await prisma.snacks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends snacksFindFirstArgs>(args?: SelectSubset<T, snacksFindFirstArgs<ExtArgs>>): Prisma__snacksClient<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Snacks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {snacksFindFirstOrThrowArgs} args - Arguments to find a Snacks
     * @example
     * // Get one Snacks
     * const snacks = await prisma.snacks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends snacksFindFirstOrThrowArgs>(args?: SelectSubset<T, snacksFindFirstOrThrowArgs<ExtArgs>>): Prisma__snacksClient<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Snacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {snacksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Snacks
     * const snacks = await prisma.snacks.findMany()
     * 
     * // Get first 10 Snacks
     * const snacks = await prisma.snacks.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const snacksWithIdOnly = await prisma.snacks.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends snacksFindManyArgs>(args?: SelectSubset<T, snacksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Snacks.
     * @param {snacksCreateArgs} args - Arguments to create a Snacks.
     * @example
     * // Create one Snacks
     * const Snacks = await prisma.snacks.create({
     *   data: {
     *     // ... data to create a Snacks
     *   }
     * })
     * 
     */
    create<T extends snacksCreateArgs>(args: SelectSubset<T, snacksCreateArgs<ExtArgs>>): Prisma__snacksClient<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Snacks.
     * @param {snacksCreateManyArgs} args - Arguments to create many Snacks.
     * @example
     * // Create many Snacks
     * const snacks = await prisma.snacks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends snacksCreateManyArgs>(args?: SelectSubset<T, snacksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Snacks and returns the data saved in the database.
     * @param {snacksCreateManyAndReturnArgs} args - Arguments to create many Snacks.
     * @example
     * // Create many Snacks
     * const snacks = await prisma.snacks.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Snacks and only return the `id`
     * const snacksWithIdOnly = await prisma.snacks.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends snacksCreateManyAndReturnArgs>(args?: SelectSubset<T, snacksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Snacks.
     * @param {snacksDeleteArgs} args - Arguments to delete one Snacks.
     * @example
     * // Delete one Snacks
     * const Snacks = await prisma.snacks.delete({
     *   where: {
     *     // ... filter to delete one Snacks
     *   }
     * })
     * 
     */
    delete<T extends snacksDeleteArgs>(args: SelectSubset<T, snacksDeleteArgs<ExtArgs>>): Prisma__snacksClient<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Snacks.
     * @param {snacksUpdateArgs} args - Arguments to update one Snacks.
     * @example
     * // Update one Snacks
     * const snacks = await prisma.snacks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends snacksUpdateArgs>(args: SelectSubset<T, snacksUpdateArgs<ExtArgs>>): Prisma__snacksClient<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Snacks.
     * @param {snacksDeleteManyArgs} args - Arguments to filter Snacks to delete.
     * @example
     * // Delete a few Snacks
     * const { count } = await prisma.snacks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends snacksDeleteManyArgs>(args?: SelectSubset<T, snacksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Snacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {snacksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Snacks
     * const snacks = await prisma.snacks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends snacksUpdateManyArgs>(args: SelectSubset<T, snacksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Snacks and returns the data updated in the database.
     * @param {snacksUpdateManyAndReturnArgs} args - Arguments to update many Snacks.
     * @example
     * // Update many Snacks
     * const snacks = await prisma.snacks.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Snacks and only return the `id`
     * const snacksWithIdOnly = await prisma.snacks.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends snacksUpdateManyAndReturnArgs>(args: SelectSubset<T, snacksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Snacks.
     * @param {snacksUpsertArgs} args - Arguments to update or create a Snacks.
     * @example
     * // Update or create a Snacks
     * const snacks = await prisma.snacks.upsert({
     *   create: {
     *     // ... data to create a Snacks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Snacks we want to update
     *   }
     * })
     */
    upsert<T extends snacksUpsertArgs>(args: SelectSubset<T, snacksUpsertArgs<ExtArgs>>): Prisma__snacksClient<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Snacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {snacksCountArgs} args - Arguments to filter Snacks to count.
     * @example
     * // Count the number of Snacks
     * const count = await prisma.snacks.count({
     *   where: {
     *     // ... the filter for the Snacks we want to count
     *   }
     * })
    **/
    count<T extends snacksCountArgs>(
      args?: Subset<T, snacksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SnacksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Snacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnacksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SnacksAggregateArgs>(args: Subset<T, SnacksAggregateArgs>): Prisma.PrismaPromise<GetSnacksAggregateType<T>>

    /**
     * Group by Snacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {snacksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends snacksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: snacksGroupByArgs['orderBy'] }
        : { orderBy?: snacksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, snacksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSnacksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the snacks model
   */
  readonly fields: snacksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for snacks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__snacksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    favorite<T extends snacks$favoriteArgs<ExtArgs> = {}>(args?: Subset<T, snacks$favoriteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the snacks model
   */
  interface snacksFieldRefs {
    readonly id: FieldRef<"snacks", 'String'>
    readonly title: FieldRef<"snacks", 'String'>
    readonly description: FieldRef<"snacks", 'String'>
    readonly category: FieldRef<"snacks", 'String'>
    readonly ingredients: FieldRef<"snacks", 'String[]'>
    readonly price: FieldRef<"snacks", 'Float'>
    readonly created_at: FieldRef<"snacks", 'DateTime'>
    readonly updated_at: FieldRef<"snacks", 'DateTime'>
    readonly userId: FieldRef<"snacks", 'String'>
  }
    

  // Custom InputTypes
  /**
   * snacks findUnique
   */
  export type snacksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksInclude<ExtArgs> | null
    /**
     * Filter, which snacks to fetch.
     */
    where: snacksWhereUniqueInput
  }

  /**
   * snacks findUniqueOrThrow
   */
  export type snacksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksInclude<ExtArgs> | null
    /**
     * Filter, which snacks to fetch.
     */
    where: snacksWhereUniqueInput
  }

  /**
   * snacks findFirst
   */
  export type snacksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksInclude<ExtArgs> | null
    /**
     * Filter, which snacks to fetch.
     */
    where?: snacksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of snacks to fetch.
     */
    orderBy?: snacksOrderByWithRelationInput | snacksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for snacks.
     */
    cursor?: snacksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` snacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` snacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of snacks.
     */
    distinct?: SnacksScalarFieldEnum | SnacksScalarFieldEnum[]
  }

  /**
   * snacks findFirstOrThrow
   */
  export type snacksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksInclude<ExtArgs> | null
    /**
     * Filter, which snacks to fetch.
     */
    where?: snacksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of snacks to fetch.
     */
    orderBy?: snacksOrderByWithRelationInput | snacksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for snacks.
     */
    cursor?: snacksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` snacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` snacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of snacks.
     */
    distinct?: SnacksScalarFieldEnum | SnacksScalarFieldEnum[]
  }

  /**
   * snacks findMany
   */
  export type snacksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksInclude<ExtArgs> | null
    /**
     * Filter, which snacks to fetch.
     */
    where?: snacksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of snacks to fetch.
     */
    orderBy?: snacksOrderByWithRelationInput | snacksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing snacks.
     */
    cursor?: snacksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` snacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` snacks.
     */
    skip?: number
    distinct?: SnacksScalarFieldEnum | SnacksScalarFieldEnum[]
  }

  /**
   * snacks create
   */
  export type snacksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksInclude<ExtArgs> | null
    /**
     * The data needed to create a snacks.
     */
    data: XOR<snacksCreateInput, snacksUncheckedCreateInput>
  }

  /**
   * snacks createMany
   */
  export type snacksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many snacks.
     */
    data: snacksCreateManyInput | snacksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * snacks createManyAndReturn
   */
  export type snacksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * The data used to create many snacks.
     */
    data: snacksCreateManyInput | snacksCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * snacks update
   */
  export type snacksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksInclude<ExtArgs> | null
    /**
     * The data needed to update a snacks.
     */
    data: XOR<snacksUpdateInput, snacksUncheckedUpdateInput>
    /**
     * Choose, which snacks to update.
     */
    where: snacksWhereUniqueInput
  }

  /**
   * snacks updateMany
   */
  export type snacksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update snacks.
     */
    data: XOR<snacksUpdateManyMutationInput, snacksUncheckedUpdateManyInput>
    /**
     * Filter which snacks to update
     */
    where?: snacksWhereInput
    /**
     * Limit how many snacks to update.
     */
    limit?: number
  }

  /**
   * snacks updateManyAndReturn
   */
  export type snacksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * The data used to update snacks.
     */
    data: XOR<snacksUpdateManyMutationInput, snacksUncheckedUpdateManyInput>
    /**
     * Filter which snacks to update
     */
    where?: snacksWhereInput
    /**
     * Limit how many snacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * snacks upsert
   */
  export type snacksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksInclude<ExtArgs> | null
    /**
     * The filter to search for the snacks to update in case it exists.
     */
    where: snacksWhereUniqueInput
    /**
     * In case the snacks found by the `where` argument doesn't exist, create a new snacks with this data.
     */
    create: XOR<snacksCreateInput, snacksUncheckedCreateInput>
    /**
     * In case the snacks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<snacksUpdateInput, snacksUncheckedUpdateInput>
  }

  /**
   * snacks delete
   */
  export type snacksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksInclude<ExtArgs> | null
    /**
     * Filter which snacks to delete.
     */
    where: snacksWhereUniqueInput
  }

  /**
   * snacks deleteMany
   */
  export type snacksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which snacks to delete
     */
    where?: snacksWhereInput
    /**
     * Limit how many snacks to delete.
     */
    limit?: number
  }

  /**
   * snacks.favorite
   */
  export type snacks$favoriteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
    where?: favoritesWhereInput
    orderBy?: favoritesOrderByWithRelationInput | favoritesOrderByWithRelationInput[]
    cursor?: favoritesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoritesScalarFieldEnum | FavoritesScalarFieldEnum[]
  }

  /**
   * snacks without action
   */
  export type snacksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the snacks
     */
    select?: snacksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the snacks
     */
    omit?: snacksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: snacksInclude<ExtArgs> | null
  }


  /**
   * Model favorites
   */

  export type AggregateFavorites = {
    _count: FavoritesCountAggregateOutputType | null
    _min: FavoritesMinAggregateOutputType | null
    _max: FavoritesMaxAggregateOutputType | null
  }

  export type FavoritesMinAggregateOutputType = {
    id: string | null
    userId: string | null
    snackId: string | null
  }

  export type FavoritesMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    snackId: string | null
  }

  export type FavoritesCountAggregateOutputType = {
    id: number
    userId: number
    snackId: number
    _all: number
  }


  export type FavoritesMinAggregateInputType = {
    id?: true
    userId?: true
    snackId?: true
  }

  export type FavoritesMaxAggregateInputType = {
    id?: true
    userId?: true
    snackId?: true
  }

  export type FavoritesCountAggregateInputType = {
    id?: true
    userId?: true
    snackId?: true
    _all?: true
  }

  export type FavoritesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which favorites to aggregate.
     */
    where?: favoritesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of favorites to fetch.
     */
    orderBy?: favoritesOrderByWithRelationInput | favoritesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: favoritesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned favorites
    **/
    _count?: true | FavoritesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoritesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoritesMaxAggregateInputType
  }

  export type GetFavoritesAggregateType<T extends FavoritesAggregateArgs> = {
        [P in keyof T & keyof AggregateFavorites]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavorites[P]>
      : GetScalarType<T[P], AggregateFavorites[P]>
  }




  export type favoritesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: favoritesWhereInput
    orderBy?: favoritesOrderByWithAggregationInput | favoritesOrderByWithAggregationInput[]
    by: FavoritesScalarFieldEnum[] | FavoritesScalarFieldEnum
    having?: favoritesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoritesCountAggregateInputType | true
    _min?: FavoritesMinAggregateInputType
    _max?: FavoritesMaxAggregateInputType
  }

  export type FavoritesGroupByOutputType = {
    id: string
    userId: string
    snackId: string
    _count: FavoritesCountAggregateOutputType | null
    _min: FavoritesMinAggregateOutputType | null
    _max: FavoritesMaxAggregateOutputType | null
  }

  type GetFavoritesGroupByPayload<T extends favoritesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoritesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoritesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoritesGroupByOutputType[P]>
            : GetScalarType<T[P], FavoritesGroupByOutputType[P]>
        }
      >
    >


  export type favoritesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    snackId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    snack?: boolean | snacksDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorites"]>

  export type favoritesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    snackId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    snack?: boolean | snacksDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorites"]>

  export type favoritesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    snackId?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    snack?: boolean | snacksDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorites"]>

  export type favoritesSelectScalar = {
    id?: boolean
    userId?: boolean
    snackId?: boolean
  }

  export type favoritesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "snackId", ExtArgs["result"]["favorites"]>
  export type favoritesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    snack?: boolean | snacksDefaultArgs<ExtArgs>
  }
  export type favoritesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    snack?: boolean | snacksDefaultArgs<ExtArgs>
  }
  export type favoritesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    snack?: boolean | snacksDefaultArgs<ExtArgs>
  }

  export type $favoritesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "favorites"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
      snack: Prisma.$snacksPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      snackId: string
    }, ExtArgs["result"]["favorites"]>
    composites: {}
  }

  type favoritesGetPayload<S extends boolean | null | undefined | favoritesDefaultArgs> = $Result.GetResult<Prisma.$favoritesPayload, S>

  type favoritesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<favoritesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoritesCountAggregateInputType | true
    }

  export interface favoritesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['favorites'], meta: { name: 'favorites' } }
    /**
     * Find zero or one Favorites that matches the filter.
     * @param {favoritesFindUniqueArgs} args - Arguments to find a Favorites
     * @example
     * // Get one Favorites
     * const favorites = await prisma.favorites.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends favoritesFindUniqueArgs>(args: SelectSubset<T, favoritesFindUniqueArgs<ExtArgs>>): Prisma__favoritesClient<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Favorites that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {favoritesFindUniqueOrThrowArgs} args - Arguments to find a Favorites
     * @example
     * // Get one Favorites
     * const favorites = await prisma.favorites.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends favoritesFindUniqueOrThrowArgs>(args: SelectSubset<T, favoritesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__favoritesClient<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {favoritesFindFirstArgs} args - Arguments to find a Favorites
     * @example
     * // Get one Favorites
     * const favorites = await prisma.favorites.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends favoritesFindFirstArgs>(args?: SelectSubset<T, favoritesFindFirstArgs<ExtArgs>>): Prisma__favoritesClient<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorites that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {favoritesFindFirstOrThrowArgs} args - Arguments to find a Favorites
     * @example
     * // Get one Favorites
     * const favorites = await prisma.favorites.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends favoritesFindFirstOrThrowArgs>(args?: SelectSubset<T, favoritesFindFirstOrThrowArgs<ExtArgs>>): Prisma__favoritesClient<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {favoritesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favorites
     * const favorites = await prisma.favorites.findMany()
     * 
     * // Get first 10 Favorites
     * const favorites = await prisma.favorites.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoritesWithIdOnly = await prisma.favorites.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends favoritesFindManyArgs>(args?: SelectSubset<T, favoritesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Favorites.
     * @param {favoritesCreateArgs} args - Arguments to create a Favorites.
     * @example
     * // Create one Favorites
     * const Favorites = await prisma.favorites.create({
     *   data: {
     *     // ... data to create a Favorites
     *   }
     * })
     * 
     */
    create<T extends favoritesCreateArgs>(args: SelectSubset<T, favoritesCreateArgs<ExtArgs>>): Prisma__favoritesClient<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Favorites.
     * @param {favoritesCreateManyArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorites = await prisma.favorites.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends favoritesCreateManyArgs>(args?: SelectSubset<T, favoritesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Favorites and returns the data saved in the database.
     * @param {favoritesCreateManyAndReturnArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorites = await prisma.favorites.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Favorites and only return the `id`
     * const favoritesWithIdOnly = await prisma.favorites.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends favoritesCreateManyAndReturnArgs>(args?: SelectSubset<T, favoritesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Favorites.
     * @param {favoritesDeleteArgs} args - Arguments to delete one Favorites.
     * @example
     * // Delete one Favorites
     * const Favorites = await prisma.favorites.delete({
     *   where: {
     *     // ... filter to delete one Favorites
     *   }
     * })
     * 
     */
    delete<T extends favoritesDeleteArgs>(args: SelectSubset<T, favoritesDeleteArgs<ExtArgs>>): Prisma__favoritesClient<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Favorites.
     * @param {favoritesUpdateArgs} args - Arguments to update one Favorites.
     * @example
     * // Update one Favorites
     * const favorites = await prisma.favorites.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends favoritesUpdateArgs>(args: SelectSubset<T, favoritesUpdateArgs<ExtArgs>>): Prisma__favoritesClient<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Favorites.
     * @param {favoritesDeleteManyArgs} args - Arguments to filter Favorites to delete.
     * @example
     * // Delete a few Favorites
     * const { count } = await prisma.favorites.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends favoritesDeleteManyArgs>(args?: SelectSubset<T, favoritesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {favoritesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favorites
     * const favorites = await prisma.favorites.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends favoritesUpdateManyArgs>(args: SelectSubset<T, favoritesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites and returns the data updated in the database.
     * @param {favoritesUpdateManyAndReturnArgs} args - Arguments to update many Favorites.
     * @example
     * // Update many Favorites
     * const favorites = await prisma.favorites.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Favorites and only return the `id`
     * const favoritesWithIdOnly = await prisma.favorites.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends favoritesUpdateManyAndReturnArgs>(args: SelectSubset<T, favoritesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Favorites.
     * @param {favoritesUpsertArgs} args - Arguments to update or create a Favorites.
     * @example
     * // Update or create a Favorites
     * const favorites = await prisma.favorites.upsert({
     *   create: {
     *     // ... data to create a Favorites
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favorites we want to update
     *   }
     * })
     */
    upsert<T extends favoritesUpsertArgs>(args: SelectSubset<T, favoritesUpsertArgs<ExtArgs>>): Prisma__favoritesClient<$Result.GetResult<Prisma.$favoritesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {favoritesCountArgs} args - Arguments to filter Favorites to count.
     * @example
     * // Count the number of Favorites
     * const count = await prisma.favorites.count({
     *   where: {
     *     // ... the filter for the Favorites we want to count
     *   }
     * })
    **/
    count<T extends favoritesCountArgs>(
      args?: Subset<T, favoritesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoritesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoritesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavoritesAggregateArgs>(args: Subset<T, FavoritesAggregateArgs>): Prisma.PrismaPromise<GetFavoritesAggregateType<T>>

    /**
     * Group by Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {favoritesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends favoritesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: favoritesGroupByArgs['orderBy'] }
        : { orderBy?: favoritesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, favoritesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoritesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the favorites model
   */
  readonly fields: favoritesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for favorites.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__favoritesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    snack<T extends snacksDefaultArgs<ExtArgs> = {}>(args?: Subset<T, snacksDefaultArgs<ExtArgs>>): Prisma__snacksClient<$Result.GetResult<Prisma.$snacksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the favorites model
   */
  interface favoritesFieldRefs {
    readonly id: FieldRef<"favorites", 'String'>
    readonly userId: FieldRef<"favorites", 'String'>
    readonly snackId: FieldRef<"favorites", 'String'>
  }
    

  // Custom InputTypes
  /**
   * favorites findUnique
   */
  export type favoritesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
    /**
     * Filter, which favorites to fetch.
     */
    where: favoritesWhereUniqueInput
  }

  /**
   * favorites findUniqueOrThrow
   */
  export type favoritesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
    /**
     * Filter, which favorites to fetch.
     */
    where: favoritesWhereUniqueInput
  }

  /**
   * favorites findFirst
   */
  export type favoritesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
    /**
     * Filter, which favorites to fetch.
     */
    where?: favoritesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of favorites to fetch.
     */
    orderBy?: favoritesOrderByWithRelationInput | favoritesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for favorites.
     */
    cursor?: favoritesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of favorites.
     */
    distinct?: FavoritesScalarFieldEnum | FavoritesScalarFieldEnum[]
  }

  /**
   * favorites findFirstOrThrow
   */
  export type favoritesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
    /**
     * Filter, which favorites to fetch.
     */
    where?: favoritesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of favorites to fetch.
     */
    orderBy?: favoritesOrderByWithRelationInput | favoritesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for favorites.
     */
    cursor?: favoritesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of favorites.
     */
    distinct?: FavoritesScalarFieldEnum | FavoritesScalarFieldEnum[]
  }

  /**
   * favorites findMany
   */
  export type favoritesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
    /**
     * Filter, which favorites to fetch.
     */
    where?: favoritesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of favorites to fetch.
     */
    orderBy?: favoritesOrderByWithRelationInput | favoritesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing favorites.
     */
    cursor?: favoritesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` favorites.
     */
    skip?: number
    distinct?: FavoritesScalarFieldEnum | FavoritesScalarFieldEnum[]
  }

  /**
   * favorites create
   */
  export type favoritesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
    /**
     * The data needed to create a favorites.
     */
    data: XOR<favoritesCreateInput, favoritesUncheckedCreateInput>
  }

  /**
   * favorites createMany
   */
  export type favoritesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many favorites.
     */
    data: favoritesCreateManyInput | favoritesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * favorites createManyAndReturn
   */
  export type favoritesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * The data used to create many favorites.
     */
    data: favoritesCreateManyInput | favoritesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * favorites update
   */
  export type favoritesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
    /**
     * The data needed to update a favorites.
     */
    data: XOR<favoritesUpdateInput, favoritesUncheckedUpdateInput>
    /**
     * Choose, which favorites to update.
     */
    where: favoritesWhereUniqueInput
  }

  /**
   * favorites updateMany
   */
  export type favoritesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update favorites.
     */
    data: XOR<favoritesUpdateManyMutationInput, favoritesUncheckedUpdateManyInput>
    /**
     * Filter which favorites to update
     */
    where?: favoritesWhereInput
    /**
     * Limit how many favorites to update.
     */
    limit?: number
  }

  /**
   * favorites updateManyAndReturn
   */
  export type favoritesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * The data used to update favorites.
     */
    data: XOR<favoritesUpdateManyMutationInput, favoritesUncheckedUpdateManyInput>
    /**
     * Filter which favorites to update
     */
    where?: favoritesWhereInput
    /**
     * Limit how many favorites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * favorites upsert
   */
  export type favoritesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
    /**
     * The filter to search for the favorites to update in case it exists.
     */
    where: favoritesWhereUniqueInput
    /**
     * In case the favorites found by the `where` argument doesn't exist, create a new favorites with this data.
     */
    create: XOR<favoritesCreateInput, favoritesUncheckedCreateInput>
    /**
     * In case the favorites was found with the provided `where` argument, update it with this data.
     */
    update: XOR<favoritesUpdateInput, favoritesUncheckedUpdateInput>
  }

  /**
   * favorites delete
   */
  export type favoritesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
    /**
     * Filter which favorites to delete.
     */
    where: favoritesWhereUniqueInput
  }

  /**
   * favorites deleteMany
   */
  export type favoritesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which favorites to delete
     */
    where?: favoritesWhereInput
    /**
     * Limit how many favorites to delete.
     */
    limit?: number
  }

  /**
   * favorites without action
   */
  export type favoritesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the favorites
     */
    select?: favoritesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the favorites
     */
    omit?: favoritesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: favoritesInclude<ExtArgs> | null
  }


  /**
   * Model refresh_tokens
   */

  export type AggregateRefresh_tokens = {
    _count: Refresh_tokensCountAggregateOutputType | null
    _avg: Refresh_tokensAvgAggregateOutputType | null
    _sum: Refresh_tokensSumAggregateOutputType | null
    _min: Refresh_tokensMinAggregateOutputType | null
    _max: Refresh_tokensMaxAggregateOutputType | null
  }

  export type Refresh_tokensAvgAggregateOutputType = {
    expiresIn: number | null
  }

  export type Refresh_tokensSumAggregateOutputType = {
    expiresIn: number | null
  }

  export type Refresh_tokensMinAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresIn: number | null
  }

  export type Refresh_tokensMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresIn: number | null
  }

  export type Refresh_tokensCountAggregateOutputType = {
    id: number
    userId: number
    expiresIn: number
    _all: number
  }


  export type Refresh_tokensAvgAggregateInputType = {
    expiresIn?: true
  }

  export type Refresh_tokensSumAggregateInputType = {
    expiresIn?: true
  }

  export type Refresh_tokensMinAggregateInputType = {
    id?: true
    userId?: true
    expiresIn?: true
  }

  export type Refresh_tokensMaxAggregateInputType = {
    id?: true
    userId?: true
    expiresIn?: true
  }

  export type Refresh_tokensCountAggregateInputType = {
    id?: true
    userId?: true
    expiresIn?: true
    _all?: true
  }

  export type Refresh_tokensAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which refresh_tokens to aggregate.
     */
    where?: refresh_tokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of refresh_tokens to fetch.
     */
    orderBy?: refresh_tokensOrderByWithRelationInput | refresh_tokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: refresh_tokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` refresh_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` refresh_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned refresh_tokens
    **/
    _count?: true | Refresh_tokensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Refresh_tokensAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Refresh_tokensSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Refresh_tokensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Refresh_tokensMaxAggregateInputType
  }

  export type GetRefresh_tokensAggregateType<T extends Refresh_tokensAggregateArgs> = {
        [P in keyof T & keyof AggregateRefresh_tokens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefresh_tokens[P]>
      : GetScalarType<T[P], AggregateRefresh_tokens[P]>
  }




  export type refresh_tokensGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: refresh_tokensWhereInput
    orderBy?: refresh_tokensOrderByWithAggregationInput | refresh_tokensOrderByWithAggregationInput[]
    by: Refresh_tokensScalarFieldEnum[] | Refresh_tokensScalarFieldEnum
    having?: refresh_tokensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Refresh_tokensCountAggregateInputType | true
    _avg?: Refresh_tokensAvgAggregateInputType
    _sum?: Refresh_tokensSumAggregateInputType
    _min?: Refresh_tokensMinAggregateInputType
    _max?: Refresh_tokensMaxAggregateInputType
  }

  export type Refresh_tokensGroupByOutputType = {
    id: string
    userId: string
    expiresIn: number
    _count: Refresh_tokensCountAggregateOutputType | null
    _avg: Refresh_tokensAvgAggregateOutputType | null
    _sum: Refresh_tokensSumAggregateOutputType | null
    _min: Refresh_tokensMinAggregateOutputType | null
    _max: Refresh_tokensMaxAggregateOutputType | null
  }

  type GetRefresh_tokensGroupByPayload<T extends refresh_tokensGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Refresh_tokensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Refresh_tokensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Refresh_tokensGroupByOutputType[P]>
            : GetScalarType<T[P], Refresh_tokensGroupByOutputType[P]>
        }
      >
    >


  export type refresh_tokensSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresIn?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refresh_tokens"]>

  export type refresh_tokensSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresIn?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refresh_tokens"]>

  export type refresh_tokensSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresIn?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refresh_tokens"]>

  export type refresh_tokensSelectScalar = {
    id?: boolean
    userId?: boolean
    expiresIn?: boolean
  }

  export type refresh_tokensOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "expiresIn", ExtArgs["result"]["refresh_tokens"]>
  export type refresh_tokensInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type refresh_tokensIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type refresh_tokensIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $refresh_tokensPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "refresh_tokens"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      expiresIn: number
    }, ExtArgs["result"]["refresh_tokens"]>
    composites: {}
  }

  type refresh_tokensGetPayload<S extends boolean | null | undefined | refresh_tokensDefaultArgs> = $Result.GetResult<Prisma.$refresh_tokensPayload, S>

  type refresh_tokensCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<refresh_tokensFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Refresh_tokensCountAggregateInputType | true
    }

  export interface refresh_tokensDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['refresh_tokens'], meta: { name: 'refresh_tokens' } }
    /**
     * Find zero or one Refresh_tokens that matches the filter.
     * @param {refresh_tokensFindUniqueArgs} args - Arguments to find a Refresh_tokens
     * @example
     * // Get one Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends refresh_tokensFindUniqueArgs>(args: SelectSubset<T, refresh_tokensFindUniqueArgs<ExtArgs>>): Prisma__refresh_tokensClient<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Refresh_tokens that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {refresh_tokensFindUniqueOrThrowArgs} args - Arguments to find a Refresh_tokens
     * @example
     * // Get one Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends refresh_tokensFindUniqueOrThrowArgs>(args: SelectSubset<T, refresh_tokensFindUniqueOrThrowArgs<ExtArgs>>): Prisma__refresh_tokensClient<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Refresh_tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokensFindFirstArgs} args - Arguments to find a Refresh_tokens
     * @example
     * // Get one Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends refresh_tokensFindFirstArgs>(args?: SelectSubset<T, refresh_tokensFindFirstArgs<ExtArgs>>): Prisma__refresh_tokensClient<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Refresh_tokens that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokensFindFirstOrThrowArgs} args - Arguments to find a Refresh_tokens
     * @example
     * // Get one Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends refresh_tokensFindFirstOrThrowArgs>(args?: SelectSubset<T, refresh_tokensFindFirstOrThrowArgs<ExtArgs>>): Prisma__refresh_tokensClient<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Refresh_tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokensFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.findMany()
     * 
     * // Get first 10 Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refresh_tokensWithIdOnly = await prisma.refresh_tokens.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends refresh_tokensFindManyArgs>(args?: SelectSubset<T, refresh_tokensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Refresh_tokens.
     * @param {refresh_tokensCreateArgs} args - Arguments to create a Refresh_tokens.
     * @example
     * // Create one Refresh_tokens
     * const Refresh_tokens = await prisma.refresh_tokens.create({
     *   data: {
     *     // ... data to create a Refresh_tokens
     *   }
     * })
     * 
     */
    create<T extends refresh_tokensCreateArgs>(args: SelectSubset<T, refresh_tokensCreateArgs<ExtArgs>>): Prisma__refresh_tokensClient<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Refresh_tokens.
     * @param {refresh_tokensCreateManyArgs} args - Arguments to create many Refresh_tokens.
     * @example
     * // Create many Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends refresh_tokensCreateManyArgs>(args?: SelectSubset<T, refresh_tokensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Refresh_tokens and returns the data saved in the database.
     * @param {refresh_tokensCreateManyAndReturnArgs} args - Arguments to create many Refresh_tokens.
     * @example
     * // Create many Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Refresh_tokens and only return the `id`
     * const refresh_tokensWithIdOnly = await prisma.refresh_tokens.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends refresh_tokensCreateManyAndReturnArgs>(args?: SelectSubset<T, refresh_tokensCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Refresh_tokens.
     * @param {refresh_tokensDeleteArgs} args - Arguments to delete one Refresh_tokens.
     * @example
     * // Delete one Refresh_tokens
     * const Refresh_tokens = await prisma.refresh_tokens.delete({
     *   where: {
     *     // ... filter to delete one Refresh_tokens
     *   }
     * })
     * 
     */
    delete<T extends refresh_tokensDeleteArgs>(args: SelectSubset<T, refresh_tokensDeleteArgs<ExtArgs>>): Prisma__refresh_tokensClient<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Refresh_tokens.
     * @param {refresh_tokensUpdateArgs} args - Arguments to update one Refresh_tokens.
     * @example
     * // Update one Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends refresh_tokensUpdateArgs>(args: SelectSubset<T, refresh_tokensUpdateArgs<ExtArgs>>): Prisma__refresh_tokensClient<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Refresh_tokens.
     * @param {refresh_tokensDeleteManyArgs} args - Arguments to filter Refresh_tokens to delete.
     * @example
     * // Delete a few Refresh_tokens
     * const { count } = await prisma.refresh_tokens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends refresh_tokensDeleteManyArgs>(args?: SelectSubset<T, refresh_tokensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Refresh_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends refresh_tokensUpdateManyArgs>(args: SelectSubset<T, refresh_tokensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Refresh_tokens and returns the data updated in the database.
     * @param {refresh_tokensUpdateManyAndReturnArgs} args - Arguments to update many Refresh_tokens.
     * @example
     * // Update many Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Refresh_tokens and only return the `id`
     * const refresh_tokensWithIdOnly = await prisma.refresh_tokens.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends refresh_tokensUpdateManyAndReturnArgs>(args: SelectSubset<T, refresh_tokensUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Refresh_tokens.
     * @param {refresh_tokensUpsertArgs} args - Arguments to update or create a Refresh_tokens.
     * @example
     * // Update or create a Refresh_tokens
     * const refresh_tokens = await prisma.refresh_tokens.upsert({
     *   create: {
     *     // ... data to create a Refresh_tokens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Refresh_tokens we want to update
     *   }
     * })
     */
    upsert<T extends refresh_tokensUpsertArgs>(args: SelectSubset<T, refresh_tokensUpsertArgs<ExtArgs>>): Prisma__refresh_tokensClient<$Result.GetResult<Prisma.$refresh_tokensPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Refresh_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokensCountArgs} args - Arguments to filter Refresh_tokens to count.
     * @example
     * // Count the number of Refresh_tokens
     * const count = await prisma.refresh_tokens.count({
     *   where: {
     *     // ... the filter for the Refresh_tokens we want to count
     *   }
     * })
    **/
    count<T extends refresh_tokensCountArgs>(
      args?: Subset<T, refresh_tokensCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Refresh_tokensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Refresh_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Refresh_tokensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Refresh_tokensAggregateArgs>(args: Subset<T, Refresh_tokensAggregateArgs>): Prisma.PrismaPromise<GetRefresh_tokensAggregateType<T>>

    /**
     * Group by Refresh_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokensGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends refresh_tokensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: refresh_tokensGroupByArgs['orderBy'] }
        : { orderBy?: refresh_tokensGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, refresh_tokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefresh_tokensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the refresh_tokens model
   */
  readonly fields: refresh_tokensFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for refresh_tokens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__refresh_tokensClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the refresh_tokens model
   */
  interface refresh_tokensFieldRefs {
    readonly id: FieldRef<"refresh_tokens", 'String'>
    readonly userId: FieldRef<"refresh_tokens", 'String'>
    readonly expiresIn: FieldRef<"refresh_tokens", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * refresh_tokens findUnique
   */
  export type refresh_tokensFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensInclude<ExtArgs> | null
    /**
     * Filter, which refresh_tokens to fetch.
     */
    where: refresh_tokensWhereUniqueInput
  }

  /**
   * refresh_tokens findUniqueOrThrow
   */
  export type refresh_tokensFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensInclude<ExtArgs> | null
    /**
     * Filter, which refresh_tokens to fetch.
     */
    where: refresh_tokensWhereUniqueInput
  }

  /**
   * refresh_tokens findFirst
   */
  export type refresh_tokensFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensInclude<ExtArgs> | null
    /**
     * Filter, which refresh_tokens to fetch.
     */
    where?: refresh_tokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of refresh_tokens to fetch.
     */
    orderBy?: refresh_tokensOrderByWithRelationInput | refresh_tokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for refresh_tokens.
     */
    cursor?: refresh_tokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` refresh_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` refresh_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of refresh_tokens.
     */
    distinct?: Refresh_tokensScalarFieldEnum | Refresh_tokensScalarFieldEnum[]
  }

  /**
   * refresh_tokens findFirstOrThrow
   */
  export type refresh_tokensFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensInclude<ExtArgs> | null
    /**
     * Filter, which refresh_tokens to fetch.
     */
    where?: refresh_tokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of refresh_tokens to fetch.
     */
    orderBy?: refresh_tokensOrderByWithRelationInput | refresh_tokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for refresh_tokens.
     */
    cursor?: refresh_tokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` refresh_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` refresh_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of refresh_tokens.
     */
    distinct?: Refresh_tokensScalarFieldEnum | Refresh_tokensScalarFieldEnum[]
  }

  /**
   * refresh_tokens findMany
   */
  export type refresh_tokensFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensInclude<ExtArgs> | null
    /**
     * Filter, which refresh_tokens to fetch.
     */
    where?: refresh_tokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of refresh_tokens to fetch.
     */
    orderBy?: refresh_tokensOrderByWithRelationInput | refresh_tokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing refresh_tokens.
     */
    cursor?: refresh_tokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` refresh_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` refresh_tokens.
     */
    skip?: number
    distinct?: Refresh_tokensScalarFieldEnum | Refresh_tokensScalarFieldEnum[]
  }

  /**
   * refresh_tokens create
   */
  export type refresh_tokensCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensInclude<ExtArgs> | null
    /**
     * The data needed to create a refresh_tokens.
     */
    data: XOR<refresh_tokensCreateInput, refresh_tokensUncheckedCreateInput>
  }

  /**
   * refresh_tokens createMany
   */
  export type refresh_tokensCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many refresh_tokens.
     */
    data: refresh_tokensCreateManyInput | refresh_tokensCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * refresh_tokens createManyAndReturn
   */
  export type refresh_tokensCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * The data used to create many refresh_tokens.
     */
    data: refresh_tokensCreateManyInput | refresh_tokensCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * refresh_tokens update
   */
  export type refresh_tokensUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensInclude<ExtArgs> | null
    /**
     * The data needed to update a refresh_tokens.
     */
    data: XOR<refresh_tokensUpdateInput, refresh_tokensUncheckedUpdateInput>
    /**
     * Choose, which refresh_tokens to update.
     */
    where: refresh_tokensWhereUniqueInput
  }

  /**
   * refresh_tokens updateMany
   */
  export type refresh_tokensUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update refresh_tokens.
     */
    data: XOR<refresh_tokensUpdateManyMutationInput, refresh_tokensUncheckedUpdateManyInput>
    /**
     * Filter which refresh_tokens to update
     */
    where?: refresh_tokensWhereInput
    /**
     * Limit how many refresh_tokens to update.
     */
    limit?: number
  }

  /**
   * refresh_tokens updateManyAndReturn
   */
  export type refresh_tokensUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * The data used to update refresh_tokens.
     */
    data: XOR<refresh_tokensUpdateManyMutationInput, refresh_tokensUncheckedUpdateManyInput>
    /**
     * Filter which refresh_tokens to update
     */
    where?: refresh_tokensWhereInput
    /**
     * Limit how many refresh_tokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * refresh_tokens upsert
   */
  export type refresh_tokensUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensInclude<ExtArgs> | null
    /**
     * The filter to search for the refresh_tokens to update in case it exists.
     */
    where: refresh_tokensWhereUniqueInput
    /**
     * In case the refresh_tokens found by the `where` argument doesn't exist, create a new refresh_tokens with this data.
     */
    create: XOR<refresh_tokensCreateInput, refresh_tokensUncheckedCreateInput>
    /**
     * In case the refresh_tokens was found with the provided `where` argument, update it with this data.
     */
    update: XOR<refresh_tokensUpdateInput, refresh_tokensUncheckedUpdateInput>
  }

  /**
   * refresh_tokens delete
   */
  export type refresh_tokensDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensInclude<ExtArgs> | null
    /**
     * Filter which refresh_tokens to delete.
     */
    where: refresh_tokensWhereUniqueInput
  }

  /**
   * refresh_tokens deleteMany
   */
  export type refresh_tokensDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which refresh_tokens to delete
     */
    where?: refresh_tokensWhereInput
    /**
     * Limit how many refresh_tokens to delete.
     */
    limit?: number
  }

  /**
   * refresh_tokens without action
   */
  export type refresh_tokensDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_tokens
     */
    select?: refresh_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_tokens
     */
    omit?: refresh_tokensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokensInclude<ExtArgs> | null
  }


  /**
   * Model attachment
   */

  export type AggregateAttachment = {
    _count: AttachmentCountAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  export type AttachmentMinAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    created_at: Date | null
  }

  export type AttachmentMaxAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    created_at: Date | null
  }

  export type AttachmentCountAggregateOutputType = {
    id: number
    title: number
    url: number
    created_at: number
    _all: number
  }


  export type AttachmentMinAggregateInputType = {
    id?: true
    title?: true
    url?: true
    created_at?: true
  }

  export type AttachmentMaxAggregateInputType = {
    id?: true
    title?: true
    url?: true
    created_at?: true
  }

  export type AttachmentCountAggregateInputType = {
    id?: true
    title?: true
    url?: true
    created_at?: true
    _all?: true
  }

  export type AttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attachment to aggregate.
     */
    where?: attachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attachments to fetch.
     */
    orderBy?: attachmentOrderByWithRelationInput | attachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: attachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned attachments
    **/
    _count?: true | AttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttachmentMaxAggregateInputType
  }

  export type GetAttachmentAggregateType<T extends AttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttachment[P]>
      : GetScalarType<T[P], AggregateAttachment[P]>
  }




  export type attachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attachmentWhereInput
    orderBy?: attachmentOrderByWithAggregationInput | attachmentOrderByWithAggregationInput[]
    by: AttachmentScalarFieldEnum[] | AttachmentScalarFieldEnum
    having?: attachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttachmentCountAggregateInputType | true
    _min?: AttachmentMinAggregateInputType
    _max?: AttachmentMaxAggregateInputType
  }

  export type AttachmentGroupByOutputType = {
    id: string
    title: string
    url: string
    created_at: Date
    _count: AttachmentCountAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  type GetAttachmentGroupByPayload<T extends attachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
        }
      >
    >


  export type attachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    created_at?: boolean
    links?: boolean | attachment$linksArgs<ExtArgs>
    _count?: boolean | AttachmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type attachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["attachment"]>

  export type attachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["attachment"]>

  export type attachmentSelectScalar = {
    id?: boolean
    title?: boolean
    url?: boolean
    created_at?: boolean
  }

  export type attachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "url" | "created_at", ExtArgs["result"]["attachment"]>
  export type attachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    links?: boolean | attachment$linksArgs<ExtArgs>
    _count?: boolean | AttachmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type attachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type attachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $attachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "attachment"
    objects: {
      links: Prisma.$attachment_linkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      url: string
      created_at: Date
    }, ExtArgs["result"]["attachment"]>
    composites: {}
  }

  type attachmentGetPayload<S extends boolean | null | undefined | attachmentDefaultArgs> = $Result.GetResult<Prisma.$attachmentPayload, S>

  type attachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<attachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttachmentCountAggregateInputType | true
    }

  export interface attachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['attachment'], meta: { name: 'attachment' } }
    /**
     * Find zero or one Attachment that matches the filter.
     * @param {attachmentFindUniqueArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends attachmentFindUniqueArgs>(args: SelectSubset<T, attachmentFindUniqueArgs<ExtArgs>>): Prisma__attachmentClient<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {attachmentFindUniqueOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends attachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, attachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__attachmentClient<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachmentFindFirstArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends attachmentFindFirstArgs>(args?: SelectSubset<T, attachmentFindFirstArgs<ExtArgs>>): Prisma__attachmentClient<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachmentFindFirstOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends attachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, attachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__attachmentClient<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attachments
     * const attachments = await prisma.attachment.findMany()
     * 
     * // Get first 10 Attachments
     * const attachments = await prisma.attachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attachmentWithIdOnly = await prisma.attachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends attachmentFindManyArgs>(args?: SelectSubset<T, attachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attachment.
     * @param {attachmentCreateArgs} args - Arguments to create a Attachment.
     * @example
     * // Create one Attachment
     * const Attachment = await prisma.attachment.create({
     *   data: {
     *     // ... data to create a Attachment
     *   }
     * })
     * 
     */
    create<T extends attachmentCreateArgs>(args: SelectSubset<T, attachmentCreateArgs<ExtArgs>>): Prisma__attachmentClient<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attachments.
     * @param {attachmentCreateManyArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends attachmentCreateManyArgs>(args?: SelectSubset<T, attachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attachments and returns the data saved in the database.
     * @param {attachmentCreateManyAndReturnArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends attachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, attachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attachment.
     * @param {attachmentDeleteArgs} args - Arguments to delete one Attachment.
     * @example
     * // Delete one Attachment
     * const Attachment = await prisma.attachment.delete({
     *   where: {
     *     // ... filter to delete one Attachment
     *   }
     * })
     * 
     */
    delete<T extends attachmentDeleteArgs>(args: SelectSubset<T, attachmentDeleteArgs<ExtArgs>>): Prisma__attachmentClient<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attachment.
     * @param {attachmentUpdateArgs} args - Arguments to update one Attachment.
     * @example
     * // Update one Attachment
     * const attachment = await prisma.attachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends attachmentUpdateArgs>(args: SelectSubset<T, attachmentUpdateArgs<ExtArgs>>): Prisma__attachmentClient<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attachments.
     * @param {attachmentDeleteManyArgs} args - Arguments to filter Attachments to delete.
     * @example
     * // Delete a few Attachments
     * const { count } = await prisma.attachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends attachmentDeleteManyArgs>(args?: SelectSubset<T, attachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends attachmentUpdateManyArgs>(args: SelectSubset<T, attachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments and returns the data updated in the database.
     * @param {attachmentUpdateManyAndReturnArgs} args - Arguments to update many Attachments.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends attachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, attachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attachment.
     * @param {attachmentUpsertArgs} args - Arguments to update or create a Attachment.
     * @example
     * // Update or create a Attachment
     * const attachment = await prisma.attachment.upsert({
     *   create: {
     *     // ... data to create a Attachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attachment we want to update
     *   }
     * })
     */
    upsert<T extends attachmentUpsertArgs>(args: SelectSubset<T, attachmentUpsertArgs<ExtArgs>>): Prisma__attachmentClient<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachmentCountArgs} args - Arguments to filter Attachments to count.
     * @example
     * // Count the number of Attachments
     * const count = await prisma.attachment.count({
     *   where: {
     *     // ... the filter for the Attachments we want to count
     *   }
     * })
    **/
    count<T extends attachmentCountArgs>(
      args?: Subset<T, attachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttachmentAggregateArgs>(args: Subset<T, AttachmentAggregateArgs>): Prisma.PrismaPromise<GetAttachmentAggregateType<T>>

    /**
     * Group by Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends attachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: attachmentGroupByArgs['orderBy'] }
        : { orderBy?: attachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, attachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the attachment model
   */
  readonly fields: attachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for attachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__attachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    links<T extends attachment$linksArgs<ExtArgs> = {}>(args?: Subset<T, attachment$linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the attachment model
   */
  interface attachmentFieldRefs {
    readonly id: FieldRef<"attachment", 'String'>
    readonly title: FieldRef<"attachment", 'String'>
    readonly url: FieldRef<"attachment", 'String'>
    readonly created_at: FieldRef<"attachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * attachment findUnique
   */
  export type attachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachmentInclude<ExtArgs> | null
    /**
     * Filter, which attachment to fetch.
     */
    where: attachmentWhereUniqueInput
  }

  /**
   * attachment findUniqueOrThrow
   */
  export type attachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachmentInclude<ExtArgs> | null
    /**
     * Filter, which attachment to fetch.
     */
    where: attachmentWhereUniqueInput
  }

  /**
   * attachment findFirst
   */
  export type attachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachmentInclude<ExtArgs> | null
    /**
     * Filter, which attachment to fetch.
     */
    where?: attachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attachments to fetch.
     */
    orderBy?: attachmentOrderByWithRelationInput | attachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attachments.
     */
    cursor?: attachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * attachment findFirstOrThrow
   */
  export type attachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachmentInclude<ExtArgs> | null
    /**
     * Filter, which attachment to fetch.
     */
    where?: attachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attachments to fetch.
     */
    orderBy?: attachmentOrderByWithRelationInput | attachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attachments.
     */
    cursor?: attachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * attachment findMany
   */
  export type attachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachmentInclude<ExtArgs> | null
    /**
     * Filter, which attachments to fetch.
     */
    where?: attachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attachments to fetch.
     */
    orderBy?: attachmentOrderByWithRelationInput | attachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing attachments.
     */
    cursor?: attachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attachments.
     */
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * attachment create
   */
  export type attachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a attachment.
     */
    data: XOR<attachmentCreateInput, attachmentUncheckedCreateInput>
  }

  /**
   * attachment createMany
   */
  export type attachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many attachments.
     */
    data: attachmentCreateManyInput | attachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * attachment createManyAndReturn
   */
  export type attachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * The data used to create many attachments.
     */
    data: attachmentCreateManyInput | attachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * attachment update
   */
  export type attachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a attachment.
     */
    data: XOR<attachmentUpdateInput, attachmentUncheckedUpdateInput>
    /**
     * Choose, which attachment to update.
     */
    where: attachmentWhereUniqueInput
  }

  /**
   * attachment updateMany
   */
  export type attachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update attachments.
     */
    data: XOR<attachmentUpdateManyMutationInput, attachmentUncheckedUpdateManyInput>
    /**
     * Filter which attachments to update
     */
    where?: attachmentWhereInput
    /**
     * Limit how many attachments to update.
     */
    limit?: number
  }

  /**
   * attachment updateManyAndReturn
   */
  export type attachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * The data used to update attachments.
     */
    data: XOR<attachmentUpdateManyMutationInput, attachmentUncheckedUpdateManyInput>
    /**
     * Filter which attachments to update
     */
    where?: attachmentWhereInput
    /**
     * Limit how many attachments to update.
     */
    limit?: number
  }

  /**
   * attachment upsert
   */
  export type attachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the attachment to update in case it exists.
     */
    where: attachmentWhereUniqueInput
    /**
     * In case the attachment found by the `where` argument doesn't exist, create a new attachment with this data.
     */
    create: XOR<attachmentCreateInput, attachmentUncheckedCreateInput>
    /**
     * In case the attachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<attachmentUpdateInput, attachmentUncheckedUpdateInput>
  }

  /**
   * attachment delete
   */
  export type attachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachmentInclude<ExtArgs> | null
    /**
     * Filter which attachment to delete.
     */
    where: attachmentWhereUniqueInput
  }

  /**
   * attachment deleteMany
   */
  export type attachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attachments to delete
     */
    where?: attachmentWhereInput
    /**
     * Limit how many attachments to delete.
     */
    limit?: number
  }

  /**
   * attachment.links
   */
  export type attachment$linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkInclude<ExtArgs> | null
    where?: attachment_linkWhereInput
    orderBy?: attachment_linkOrderByWithRelationInput | attachment_linkOrderByWithRelationInput[]
    cursor?: attachment_linkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Attachment_linkScalarFieldEnum | Attachment_linkScalarFieldEnum[]
  }

  /**
   * attachment without action
   */
  export type attachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment
     */
    select?: attachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment
     */
    omit?: attachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachmentInclude<ExtArgs> | null
  }


  /**
   * Model attachment_link
   */

  export type AggregateAttachment_link = {
    _count: Attachment_linkCountAggregateOutputType | null
    _min: Attachment_linkMinAggregateOutputType | null
    _max: Attachment_linkMaxAggregateOutputType | null
  }

  export type Attachment_linkMinAggregateOutputType = {
    id: string | null
    attachmentId: string | null
    resourceId: string | null
    resourceType: $Enums.RESOURSE_TYPE | null
  }

  export type Attachment_linkMaxAggregateOutputType = {
    id: string | null
    attachmentId: string | null
    resourceId: string | null
    resourceType: $Enums.RESOURSE_TYPE | null
  }

  export type Attachment_linkCountAggregateOutputType = {
    id: number
    attachmentId: number
    resourceId: number
    resourceType: number
    _all: number
  }


  export type Attachment_linkMinAggregateInputType = {
    id?: true
    attachmentId?: true
    resourceId?: true
    resourceType?: true
  }

  export type Attachment_linkMaxAggregateInputType = {
    id?: true
    attachmentId?: true
    resourceId?: true
    resourceType?: true
  }

  export type Attachment_linkCountAggregateInputType = {
    id?: true
    attachmentId?: true
    resourceId?: true
    resourceType?: true
    _all?: true
  }

  export type Attachment_linkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attachment_link to aggregate.
     */
    where?: attachment_linkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attachment_links to fetch.
     */
    orderBy?: attachment_linkOrderByWithRelationInput | attachment_linkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: attachment_linkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attachment_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attachment_links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned attachment_links
    **/
    _count?: true | Attachment_linkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Attachment_linkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Attachment_linkMaxAggregateInputType
  }

  export type GetAttachment_linkAggregateType<T extends Attachment_linkAggregateArgs> = {
        [P in keyof T & keyof AggregateAttachment_link]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttachment_link[P]>
      : GetScalarType<T[P], AggregateAttachment_link[P]>
  }




  export type attachment_linkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attachment_linkWhereInput
    orderBy?: attachment_linkOrderByWithAggregationInput | attachment_linkOrderByWithAggregationInput[]
    by: Attachment_linkScalarFieldEnum[] | Attachment_linkScalarFieldEnum
    having?: attachment_linkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Attachment_linkCountAggregateInputType | true
    _min?: Attachment_linkMinAggregateInputType
    _max?: Attachment_linkMaxAggregateInputType
  }

  export type Attachment_linkGroupByOutputType = {
    id: string
    attachmentId: string
    resourceId: string | null
    resourceType: $Enums.RESOURSE_TYPE | null
    _count: Attachment_linkCountAggregateOutputType | null
    _min: Attachment_linkMinAggregateOutputType | null
    _max: Attachment_linkMaxAggregateOutputType | null
  }

  type GetAttachment_linkGroupByPayload<T extends attachment_linkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Attachment_linkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Attachment_linkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Attachment_linkGroupByOutputType[P]>
            : GetScalarType<T[P], Attachment_linkGroupByOutputType[P]>
        }
      >
    >


  export type attachment_linkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attachmentId?: boolean
    resourceId?: boolean
    resourceType?: boolean
    attachment?: boolean | attachmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment_link"]>

  export type attachment_linkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attachmentId?: boolean
    resourceId?: boolean
    resourceType?: boolean
    attachment?: boolean | attachmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment_link"]>

  export type attachment_linkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attachmentId?: boolean
    resourceId?: boolean
    resourceType?: boolean
    attachment?: boolean | attachmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment_link"]>

  export type attachment_linkSelectScalar = {
    id?: boolean
    attachmentId?: boolean
    resourceId?: boolean
    resourceType?: boolean
  }

  export type attachment_linkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "attachmentId" | "resourceId" | "resourceType", ExtArgs["result"]["attachment_link"]>
  export type attachment_linkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachment?: boolean | attachmentDefaultArgs<ExtArgs>
  }
  export type attachment_linkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachment?: boolean | attachmentDefaultArgs<ExtArgs>
  }
  export type attachment_linkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachment?: boolean | attachmentDefaultArgs<ExtArgs>
  }

  export type $attachment_linkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "attachment_link"
    objects: {
      attachment: Prisma.$attachmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      attachmentId: string
      resourceId: string | null
      resourceType: $Enums.RESOURSE_TYPE | null
    }, ExtArgs["result"]["attachment_link"]>
    composites: {}
  }

  type attachment_linkGetPayload<S extends boolean | null | undefined | attachment_linkDefaultArgs> = $Result.GetResult<Prisma.$attachment_linkPayload, S>

  type attachment_linkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<attachment_linkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Attachment_linkCountAggregateInputType | true
    }

  export interface attachment_linkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['attachment_link'], meta: { name: 'attachment_link' } }
    /**
     * Find zero or one Attachment_link that matches the filter.
     * @param {attachment_linkFindUniqueArgs} args - Arguments to find a Attachment_link
     * @example
     * // Get one Attachment_link
     * const attachment_link = await prisma.attachment_link.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends attachment_linkFindUniqueArgs>(args: SelectSubset<T, attachment_linkFindUniqueArgs<ExtArgs>>): Prisma__attachment_linkClient<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attachment_link that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {attachment_linkFindUniqueOrThrowArgs} args - Arguments to find a Attachment_link
     * @example
     * // Get one Attachment_link
     * const attachment_link = await prisma.attachment_link.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends attachment_linkFindUniqueOrThrowArgs>(args: SelectSubset<T, attachment_linkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__attachment_linkClient<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment_link that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachment_linkFindFirstArgs} args - Arguments to find a Attachment_link
     * @example
     * // Get one Attachment_link
     * const attachment_link = await prisma.attachment_link.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends attachment_linkFindFirstArgs>(args?: SelectSubset<T, attachment_linkFindFirstArgs<ExtArgs>>): Prisma__attachment_linkClient<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment_link that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachment_linkFindFirstOrThrowArgs} args - Arguments to find a Attachment_link
     * @example
     * // Get one Attachment_link
     * const attachment_link = await prisma.attachment_link.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends attachment_linkFindFirstOrThrowArgs>(args?: SelectSubset<T, attachment_linkFindFirstOrThrowArgs<ExtArgs>>): Prisma__attachment_linkClient<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attachment_links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachment_linkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attachment_links
     * const attachment_links = await prisma.attachment_link.findMany()
     * 
     * // Get first 10 Attachment_links
     * const attachment_links = await prisma.attachment_link.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attachment_linkWithIdOnly = await prisma.attachment_link.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends attachment_linkFindManyArgs>(args?: SelectSubset<T, attachment_linkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attachment_link.
     * @param {attachment_linkCreateArgs} args - Arguments to create a Attachment_link.
     * @example
     * // Create one Attachment_link
     * const Attachment_link = await prisma.attachment_link.create({
     *   data: {
     *     // ... data to create a Attachment_link
     *   }
     * })
     * 
     */
    create<T extends attachment_linkCreateArgs>(args: SelectSubset<T, attachment_linkCreateArgs<ExtArgs>>): Prisma__attachment_linkClient<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attachment_links.
     * @param {attachment_linkCreateManyArgs} args - Arguments to create many Attachment_links.
     * @example
     * // Create many Attachment_links
     * const attachment_link = await prisma.attachment_link.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends attachment_linkCreateManyArgs>(args?: SelectSubset<T, attachment_linkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attachment_links and returns the data saved in the database.
     * @param {attachment_linkCreateManyAndReturnArgs} args - Arguments to create many Attachment_links.
     * @example
     * // Create many Attachment_links
     * const attachment_link = await prisma.attachment_link.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attachment_links and only return the `id`
     * const attachment_linkWithIdOnly = await prisma.attachment_link.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends attachment_linkCreateManyAndReturnArgs>(args?: SelectSubset<T, attachment_linkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attachment_link.
     * @param {attachment_linkDeleteArgs} args - Arguments to delete one Attachment_link.
     * @example
     * // Delete one Attachment_link
     * const Attachment_link = await prisma.attachment_link.delete({
     *   where: {
     *     // ... filter to delete one Attachment_link
     *   }
     * })
     * 
     */
    delete<T extends attachment_linkDeleteArgs>(args: SelectSubset<T, attachment_linkDeleteArgs<ExtArgs>>): Prisma__attachment_linkClient<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attachment_link.
     * @param {attachment_linkUpdateArgs} args - Arguments to update one Attachment_link.
     * @example
     * // Update one Attachment_link
     * const attachment_link = await prisma.attachment_link.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends attachment_linkUpdateArgs>(args: SelectSubset<T, attachment_linkUpdateArgs<ExtArgs>>): Prisma__attachment_linkClient<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attachment_links.
     * @param {attachment_linkDeleteManyArgs} args - Arguments to filter Attachment_links to delete.
     * @example
     * // Delete a few Attachment_links
     * const { count } = await prisma.attachment_link.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends attachment_linkDeleteManyArgs>(args?: SelectSubset<T, attachment_linkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachment_links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachment_linkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attachment_links
     * const attachment_link = await prisma.attachment_link.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends attachment_linkUpdateManyArgs>(args: SelectSubset<T, attachment_linkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachment_links and returns the data updated in the database.
     * @param {attachment_linkUpdateManyAndReturnArgs} args - Arguments to update many Attachment_links.
     * @example
     * // Update many Attachment_links
     * const attachment_link = await prisma.attachment_link.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attachment_links and only return the `id`
     * const attachment_linkWithIdOnly = await prisma.attachment_link.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends attachment_linkUpdateManyAndReturnArgs>(args: SelectSubset<T, attachment_linkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attachment_link.
     * @param {attachment_linkUpsertArgs} args - Arguments to update or create a Attachment_link.
     * @example
     * // Update or create a Attachment_link
     * const attachment_link = await prisma.attachment_link.upsert({
     *   create: {
     *     // ... data to create a Attachment_link
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attachment_link we want to update
     *   }
     * })
     */
    upsert<T extends attachment_linkUpsertArgs>(args: SelectSubset<T, attachment_linkUpsertArgs<ExtArgs>>): Prisma__attachment_linkClient<$Result.GetResult<Prisma.$attachment_linkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attachment_links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachment_linkCountArgs} args - Arguments to filter Attachment_links to count.
     * @example
     * // Count the number of Attachment_links
     * const count = await prisma.attachment_link.count({
     *   where: {
     *     // ... the filter for the Attachment_links we want to count
     *   }
     * })
    **/
    count<T extends attachment_linkCountArgs>(
      args?: Subset<T, attachment_linkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Attachment_linkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attachment_link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Attachment_linkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Attachment_linkAggregateArgs>(args: Subset<T, Attachment_linkAggregateArgs>): Prisma.PrismaPromise<GetAttachment_linkAggregateType<T>>

    /**
     * Group by Attachment_link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attachment_linkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends attachment_linkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: attachment_linkGroupByArgs['orderBy'] }
        : { orderBy?: attachment_linkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, attachment_linkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttachment_linkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the attachment_link model
   */
  readonly fields: attachment_linkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for attachment_link.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__attachment_linkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attachment<T extends attachmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, attachmentDefaultArgs<ExtArgs>>): Prisma__attachmentClient<$Result.GetResult<Prisma.$attachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the attachment_link model
   */
  interface attachment_linkFieldRefs {
    readonly id: FieldRef<"attachment_link", 'String'>
    readonly attachmentId: FieldRef<"attachment_link", 'String'>
    readonly resourceId: FieldRef<"attachment_link", 'String'>
    readonly resourceType: FieldRef<"attachment_link", 'RESOURSE_TYPE'>
  }
    

  // Custom InputTypes
  /**
   * attachment_link findUnique
   */
  export type attachment_linkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkInclude<ExtArgs> | null
    /**
     * Filter, which attachment_link to fetch.
     */
    where: attachment_linkWhereUniqueInput
  }

  /**
   * attachment_link findUniqueOrThrow
   */
  export type attachment_linkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkInclude<ExtArgs> | null
    /**
     * Filter, which attachment_link to fetch.
     */
    where: attachment_linkWhereUniqueInput
  }

  /**
   * attachment_link findFirst
   */
  export type attachment_linkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkInclude<ExtArgs> | null
    /**
     * Filter, which attachment_link to fetch.
     */
    where?: attachment_linkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attachment_links to fetch.
     */
    orderBy?: attachment_linkOrderByWithRelationInput | attachment_linkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attachment_links.
     */
    cursor?: attachment_linkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attachment_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attachment_links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attachment_links.
     */
    distinct?: Attachment_linkScalarFieldEnum | Attachment_linkScalarFieldEnum[]
  }

  /**
   * attachment_link findFirstOrThrow
   */
  export type attachment_linkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkInclude<ExtArgs> | null
    /**
     * Filter, which attachment_link to fetch.
     */
    where?: attachment_linkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attachment_links to fetch.
     */
    orderBy?: attachment_linkOrderByWithRelationInput | attachment_linkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attachment_links.
     */
    cursor?: attachment_linkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attachment_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attachment_links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attachment_links.
     */
    distinct?: Attachment_linkScalarFieldEnum | Attachment_linkScalarFieldEnum[]
  }

  /**
   * attachment_link findMany
   */
  export type attachment_linkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkInclude<ExtArgs> | null
    /**
     * Filter, which attachment_links to fetch.
     */
    where?: attachment_linkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attachment_links to fetch.
     */
    orderBy?: attachment_linkOrderByWithRelationInput | attachment_linkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing attachment_links.
     */
    cursor?: attachment_linkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attachment_links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attachment_links.
     */
    skip?: number
    distinct?: Attachment_linkScalarFieldEnum | Attachment_linkScalarFieldEnum[]
  }

  /**
   * attachment_link create
   */
  export type attachment_linkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkInclude<ExtArgs> | null
    /**
     * The data needed to create a attachment_link.
     */
    data: XOR<attachment_linkCreateInput, attachment_linkUncheckedCreateInput>
  }

  /**
   * attachment_link createMany
   */
  export type attachment_linkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many attachment_links.
     */
    data: attachment_linkCreateManyInput | attachment_linkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * attachment_link createManyAndReturn
   */
  export type attachment_linkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * The data used to create many attachment_links.
     */
    data: attachment_linkCreateManyInput | attachment_linkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * attachment_link update
   */
  export type attachment_linkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkInclude<ExtArgs> | null
    /**
     * The data needed to update a attachment_link.
     */
    data: XOR<attachment_linkUpdateInput, attachment_linkUncheckedUpdateInput>
    /**
     * Choose, which attachment_link to update.
     */
    where: attachment_linkWhereUniqueInput
  }

  /**
   * attachment_link updateMany
   */
  export type attachment_linkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update attachment_links.
     */
    data: XOR<attachment_linkUpdateManyMutationInput, attachment_linkUncheckedUpdateManyInput>
    /**
     * Filter which attachment_links to update
     */
    where?: attachment_linkWhereInput
    /**
     * Limit how many attachment_links to update.
     */
    limit?: number
  }

  /**
   * attachment_link updateManyAndReturn
   */
  export type attachment_linkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * The data used to update attachment_links.
     */
    data: XOR<attachment_linkUpdateManyMutationInput, attachment_linkUncheckedUpdateManyInput>
    /**
     * Filter which attachment_links to update
     */
    where?: attachment_linkWhereInput
    /**
     * Limit how many attachment_links to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * attachment_link upsert
   */
  export type attachment_linkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkInclude<ExtArgs> | null
    /**
     * The filter to search for the attachment_link to update in case it exists.
     */
    where: attachment_linkWhereUniqueInput
    /**
     * In case the attachment_link found by the `where` argument doesn't exist, create a new attachment_link with this data.
     */
    create: XOR<attachment_linkCreateInput, attachment_linkUncheckedCreateInput>
    /**
     * In case the attachment_link was found with the provided `where` argument, update it with this data.
     */
    update: XOR<attachment_linkUpdateInput, attachment_linkUncheckedUpdateInput>
  }

  /**
   * attachment_link delete
   */
  export type attachment_linkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkInclude<ExtArgs> | null
    /**
     * Filter which attachment_link to delete.
     */
    where: attachment_linkWhereUniqueInput
  }

  /**
   * attachment_link deleteMany
   */
  export type attachment_linkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attachment_links to delete
     */
    where?: attachment_linkWhereInput
    /**
     * Limit how many attachment_links to delete.
     */
    limit?: number
  }

  /**
   * attachment_link without action
   */
  export type attachment_linkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attachment_link
     */
    select?: attachment_linkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attachment_link
     */
    omit?: attachment_linkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attachment_linkInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SnacksScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    category: 'category',
    ingredients: 'ingredients',
    price: 'price',
    created_at: 'created_at',
    updated_at: 'updated_at',
    userId: 'userId'
  };

  export type SnacksScalarFieldEnum = (typeof SnacksScalarFieldEnum)[keyof typeof SnacksScalarFieldEnum]


  export const FavoritesScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    snackId: 'snackId'
  };

  export type FavoritesScalarFieldEnum = (typeof FavoritesScalarFieldEnum)[keyof typeof FavoritesScalarFieldEnum]


  export const Refresh_tokensScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    expiresIn: 'expiresIn'
  };

  export type Refresh_tokensScalarFieldEnum = (typeof Refresh_tokensScalarFieldEnum)[keyof typeof Refresh_tokensScalarFieldEnum]


  export const AttachmentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    url: 'url',
    created_at: 'created_at'
  };

  export type AttachmentScalarFieldEnum = (typeof AttachmentScalarFieldEnum)[keyof typeof AttachmentScalarFieldEnum]


  export const Attachment_linkScalarFieldEnum: {
    id: 'id',
    attachmentId: 'attachmentId',
    resourceId: 'resourceId',
    resourceType: 'resourceType'
  };

  export type Attachment_linkScalarFieldEnum = (typeof Attachment_linkScalarFieldEnum)[keyof typeof Attachment_linkScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'ROLE'
   */
  export type EnumROLEFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ROLE'>
    


  /**
   * Reference to a field of type 'ROLE[]'
   */
  export type ListEnumROLEFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ROLE[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RESOURSE_TYPE'
   */
  export type EnumRESOURSE_TYPEFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RESOURSE_TYPE'>
    


  /**
   * Reference to a field of type 'RESOURSE_TYPE[]'
   */
  export type ListEnumRESOURSE_TYPEFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RESOURSE_TYPE[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: StringFilter<"users"> | string
    name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: EnumROLEFilter<"users"> | $Enums.ROLE
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    snacks?: SnacksListRelationFilter
    favorite?: FavoritesListRelationFilter
    refresh_token?: XOR<Refresh_tokensNullableScalarRelationFilter, refresh_tokensWhereInput> | null
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    snacks?: snacksOrderByRelationAggregateInput
    favorite?: favoritesOrderByRelationAggregateInput
    refresh_token?: refresh_tokensOrderByWithRelationInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    name?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: EnumROLEFilter<"users"> | $Enums.ROLE
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    snacks?: SnacksListRelationFilter
    favorite?: FavoritesListRelationFilter
    refresh_token?: XOR<Refresh_tokensNullableScalarRelationFilter, refresh_tokensWhereInput> | null
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"users"> | string
    name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    role?: EnumROLEWithAggregatesFilter<"users"> | $Enums.ROLE
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type snacksWhereInput = {
    AND?: snacksWhereInput | snacksWhereInput[]
    OR?: snacksWhereInput[]
    NOT?: snacksWhereInput | snacksWhereInput[]
    id?: StringFilter<"snacks"> | string
    title?: StringFilter<"snacks"> | string
    description?: StringFilter<"snacks"> | string
    category?: StringFilter<"snacks"> | string
    ingredients?: StringNullableListFilter<"snacks">
    price?: FloatFilter<"snacks"> | number
    created_at?: DateTimeFilter<"snacks"> | Date | string
    updated_at?: DateTimeFilter<"snacks"> | Date | string
    userId?: StringFilter<"snacks"> | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    favorite?: FavoritesListRelationFilter
  }

  export type snacksOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    ingredients?: SortOrder
    price?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    userId?: SortOrder
    user?: usersOrderByWithRelationInput
    favorite?: favoritesOrderByRelationAggregateInput
  }

  export type snacksWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: snacksWhereInput | snacksWhereInput[]
    OR?: snacksWhereInput[]
    NOT?: snacksWhereInput | snacksWhereInput[]
    title?: StringFilter<"snacks"> | string
    description?: StringFilter<"snacks"> | string
    category?: StringFilter<"snacks"> | string
    ingredients?: StringNullableListFilter<"snacks">
    price?: FloatFilter<"snacks"> | number
    created_at?: DateTimeFilter<"snacks"> | Date | string
    updated_at?: DateTimeFilter<"snacks"> | Date | string
    userId?: StringFilter<"snacks"> | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    favorite?: FavoritesListRelationFilter
  }, "id">

  export type snacksOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    ingredients?: SortOrder
    price?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    userId?: SortOrder
    _count?: snacksCountOrderByAggregateInput
    _avg?: snacksAvgOrderByAggregateInput
    _max?: snacksMaxOrderByAggregateInput
    _min?: snacksMinOrderByAggregateInput
    _sum?: snacksSumOrderByAggregateInput
  }

  export type snacksScalarWhereWithAggregatesInput = {
    AND?: snacksScalarWhereWithAggregatesInput | snacksScalarWhereWithAggregatesInput[]
    OR?: snacksScalarWhereWithAggregatesInput[]
    NOT?: snacksScalarWhereWithAggregatesInput | snacksScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"snacks"> | string
    title?: StringWithAggregatesFilter<"snacks"> | string
    description?: StringWithAggregatesFilter<"snacks"> | string
    category?: StringWithAggregatesFilter<"snacks"> | string
    ingredients?: StringNullableListFilter<"snacks">
    price?: FloatWithAggregatesFilter<"snacks"> | number
    created_at?: DateTimeWithAggregatesFilter<"snacks"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"snacks"> | Date | string
    userId?: StringWithAggregatesFilter<"snacks"> | string
  }

  export type favoritesWhereInput = {
    AND?: favoritesWhereInput | favoritesWhereInput[]
    OR?: favoritesWhereInput[]
    NOT?: favoritesWhereInput | favoritesWhereInput[]
    id?: StringFilter<"favorites"> | string
    userId?: StringFilter<"favorites"> | string
    snackId?: StringFilter<"favorites"> | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    snack?: XOR<SnacksScalarRelationFilter, snacksWhereInput>
  }

  export type favoritesOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    snackId?: SortOrder
    user?: usersOrderByWithRelationInput
    snack?: snacksOrderByWithRelationInput
  }

  export type favoritesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: favoritesWhereInput | favoritesWhereInput[]
    OR?: favoritesWhereInput[]
    NOT?: favoritesWhereInput | favoritesWhereInput[]
    userId?: StringFilter<"favorites"> | string
    snackId?: StringFilter<"favorites"> | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    snack?: XOR<SnacksScalarRelationFilter, snacksWhereInput>
  }, "id">

  export type favoritesOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    snackId?: SortOrder
    _count?: favoritesCountOrderByAggregateInput
    _max?: favoritesMaxOrderByAggregateInput
    _min?: favoritesMinOrderByAggregateInput
  }

  export type favoritesScalarWhereWithAggregatesInput = {
    AND?: favoritesScalarWhereWithAggregatesInput | favoritesScalarWhereWithAggregatesInput[]
    OR?: favoritesScalarWhereWithAggregatesInput[]
    NOT?: favoritesScalarWhereWithAggregatesInput | favoritesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"favorites"> | string
    userId?: StringWithAggregatesFilter<"favorites"> | string
    snackId?: StringWithAggregatesFilter<"favorites"> | string
  }

  export type refresh_tokensWhereInput = {
    AND?: refresh_tokensWhereInput | refresh_tokensWhereInput[]
    OR?: refresh_tokensWhereInput[]
    NOT?: refresh_tokensWhereInput | refresh_tokensWhereInput[]
    id?: StringFilter<"refresh_tokens"> | string
    userId?: StringFilter<"refresh_tokens"> | string
    expiresIn?: IntFilter<"refresh_tokens"> | number
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type refresh_tokensOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresIn?: SortOrder
    user?: usersOrderByWithRelationInput
  }

  export type refresh_tokensWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: refresh_tokensWhereInput | refresh_tokensWhereInput[]
    OR?: refresh_tokensWhereInput[]
    NOT?: refresh_tokensWhereInput | refresh_tokensWhereInput[]
    expiresIn?: IntFilter<"refresh_tokens"> | number
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "userId">

  export type refresh_tokensOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresIn?: SortOrder
    _count?: refresh_tokensCountOrderByAggregateInput
    _avg?: refresh_tokensAvgOrderByAggregateInput
    _max?: refresh_tokensMaxOrderByAggregateInput
    _min?: refresh_tokensMinOrderByAggregateInput
    _sum?: refresh_tokensSumOrderByAggregateInput
  }

  export type refresh_tokensScalarWhereWithAggregatesInput = {
    AND?: refresh_tokensScalarWhereWithAggregatesInput | refresh_tokensScalarWhereWithAggregatesInput[]
    OR?: refresh_tokensScalarWhereWithAggregatesInput[]
    NOT?: refresh_tokensScalarWhereWithAggregatesInput | refresh_tokensScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"refresh_tokens"> | string
    userId?: StringWithAggregatesFilter<"refresh_tokens"> | string
    expiresIn?: IntWithAggregatesFilter<"refresh_tokens"> | number
  }

  export type attachmentWhereInput = {
    AND?: attachmentWhereInput | attachmentWhereInput[]
    OR?: attachmentWhereInput[]
    NOT?: attachmentWhereInput | attachmentWhereInput[]
    id?: StringFilter<"attachment"> | string
    title?: StringFilter<"attachment"> | string
    url?: StringFilter<"attachment"> | string
    created_at?: DateTimeFilter<"attachment"> | Date | string
    links?: Attachment_linkListRelationFilter
  }

  export type attachmentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
    links?: attachment_linkOrderByRelationAggregateInput
  }

  export type attachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: attachmentWhereInput | attachmentWhereInput[]
    OR?: attachmentWhereInput[]
    NOT?: attachmentWhereInput | attachmentWhereInput[]
    title?: StringFilter<"attachment"> | string
    url?: StringFilter<"attachment"> | string
    created_at?: DateTimeFilter<"attachment"> | Date | string
    links?: Attachment_linkListRelationFilter
  }, "id">

  export type attachmentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
    _count?: attachmentCountOrderByAggregateInput
    _max?: attachmentMaxOrderByAggregateInput
    _min?: attachmentMinOrderByAggregateInput
  }

  export type attachmentScalarWhereWithAggregatesInput = {
    AND?: attachmentScalarWhereWithAggregatesInput | attachmentScalarWhereWithAggregatesInput[]
    OR?: attachmentScalarWhereWithAggregatesInput[]
    NOT?: attachmentScalarWhereWithAggregatesInput | attachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"attachment"> | string
    title?: StringWithAggregatesFilter<"attachment"> | string
    url?: StringWithAggregatesFilter<"attachment"> | string
    created_at?: DateTimeWithAggregatesFilter<"attachment"> | Date | string
  }

  export type attachment_linkWhereInput = {
    AND?: attachment_linkWhereInput | attachment_linkWhereInput[]
    OR?: attachment_linkWhereInput[]
    NOT?: attachment_linkWhereInput | attachment_linkWhereInput[]
    id?: StringFilter<"attachment_link"> | string
    attachmentId?: StringFilter<"attachment_link"> | string
    resourceId?: StringNullableFilter<"attachment_link"> | string | null
    resourceType?: EnumRESOURSE_TYPENullableFilter<"attachment_link"> | $Enums.RESOURSE_TYPE | null
    attachment?: XOR<AttachmentScalarRelationFilter, attachmentWhereInput>
  }

  export type attachment_linkOrderByWithRelationInput = {
    id?: SortOrder
    attachmentId?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    resourceType?: SortOrderInput | SortOrder
    attachment?: attachmentOrderByWithRelationInput
  }

  export type attachment_linkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: attachment_linkWhereInput | attachment_linkWhereInput[]
    OR?: attachment_linkWhereInput[]
    NOT?: attachment_linkWhereInput | attachment_linkWhereInput[]
    attachmentId?: StringFilter<"attachment_link"> | string
    resourceId?: StringNullableFilter<"attachment_link"> | string | null
    resourceType?: EnumRESOURSE_TYPENullableFilter<"attachment_link"> | $Enums.RESOURSE_TYPE | null
    attachment?: XOR<AttachmentScalarRelationFilter, attachmentWhereInput>
  }, "id">

  export type attachment_linkOrderByWithAggregationInput = {
    id?: SortOrder
    attachmentId?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    resourceType?: SortOrderInput | SortOrder
    _count?: attachment_linkCountOrderByAggregateInput
    _max?: attachment_linkMaxOrderByAggregateInput
    _min?: attachment_linkMinOrderByAggregateInput
  }

  export type attachment_linkScalarWhereWithAggregatesInput = {
    AND?: attachment_linkScalarWhereWithAggregatesInput | attachment_linkScalarWhereWithAggregatesInput[]
    OR?: attachment_linkScalarWhereWithAggregatesInput[]
    NOT?: attachment_linkScalarWhereWithAggregatesInput | attachment_linkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"attachment_link"> | string
    attachmentId?: StringWithAggregatesFilter<"attachment_link"> | string
    resourceId?: StringNullableWithAggregatesFilter<"attachment_link"> | string | null
    resourceType?: EnumRESOURSE_TYPENullableWithAggregatesFilter<"attachment_link"> | $Enums.RESOURSE_TYPE | null
  }

  export type usersCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.ROLE
    created_at?: Date | string
    updated_at?: Date | string
    snacks?: snacksCreateNestedManyWithoutUserInput
    favorite?: favoritesCreateNestedManyWithoutUserInput
    refresh_token?: refresh_tokensCreateNestedOneWithoutUserInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.ROLE
    created_at?: Date | string
    updated_at?: Date | string
    snacks?: snacksUncheckedCreateNestedManyWithoutUserInput
    favorite?: favoritesUncheckedCreateNestedManyWithoutUserInput
    refresh_token?: refresh_tokensUncheckedCreateNestedOneWithoutUserInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | $Enums.ROLE
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    snacks?: snacksUpdateManyWithoutUserNestedInput
    favorite?: favoritesUpdateManyWithoutUserNestedInput
    refresh_token?: refresh_tokensUpdateOneWithoutUserNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | $Enums.ROLE
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    snacks?: snacksUncheckedUpdateManyWithoutUserNestedInput
    favorite?: favoritesUncheckedUpdateManyWithoutUserNestedInput
    refresh_token?: refresh_tokensUncheckedUpdateOneWithoutUserNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.ROLE
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | $Enums.ROLE
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | $Enums.ROLE
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type snacksCreateInput = {
    id?: string
    title: string
    description: string
    category: string
    ingredients?: snacksCreateingredientsInput | string[]
    price: number
    created_at?: Date | string
    updated_at?: Date | string
    user: usersCreateNestedOneWithoutSnacksInput
    favorite?: favoritesCreateNestedManyWithoutSnackInput
  }

  export type snacksUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    category: string
    ingredients?: snacksCreateingredientsInput | string[]
    price: number
    created_at?: Date | string
    updated_at?: Date | string
    userId: string
    favorite?: favoritesUncheckedCreateNestedManyWithoutSnackInput
  }

  export type snacksUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    ingredients?: snacksUpdateingredientsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutSnacksNestedInput
    favorite?: favoritesUpdateManyWithoutSnackNestedInput
  }

  export type snacksUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    ingredients?: snacksUpdateingredientsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    favorite?: favoritesUncheckedUpdateManyWithoutSnackNestedInput
  }

  export type snacksCreateManyInput = {
    id?: string
    title: string
    description: string
    category: string
    ingredients?: snacksCreateingredientsInput | string[]
    price: number
    created_at?: Date | string
    updated_at?: Date | string
    userId: string
  }

  export type snacksUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    ingredients?: snacksUpdateingredientsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type snacksUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    ingredients?: snacksUpdateingredientsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type favoritesCreateInput = {
    id?: string
    user: usersCreateNestedOneWithoutFavoriteInput
    snack: snacksCreateNestedOneWithoutFavoriteInput
  }

  export type favoritesUncheckedCreateInput = {
    id?: string
    userId: string
    snackId: string
  }

  export type favoritesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: usersUpdateOneRequiredWithoutFavoriteNestedInput
    snack?: snacksUpdateOneRequiredWithoutFavoriteNestedInput
  }

  export type favoritesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    snackId?: StringFieldUpdateOperationsInput | string
  }

  export type favoritesCreateManyInput = {
    id?: string
    userId: string
    snackId: string
  }

  export type favoritesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type favoritesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    snackId?: StringFieldUpdateOperationsInput | string
  }

  export type refresh_tokensCreateInput = {
    id?: string
    expiresIn: number
    user: usersCreateNestedOneWithoutRefresh_tokenInput
  }

  export type refresh_tokensUncheckedCreateInput = {
    id?: string
    userId: string
    expiresIn: number
  }

  export type refresh_tokensUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresIn?: IntFieldUpdateOperationsInput | number
    user?: usersUpdateOneRequiredWithoutRefresh_tokenNestedInput
  }

  export type refresh_tokensUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresIn?: IntFieldUpdateOperationsInput | number
  }

  export type refresh_tokensCreateManyInput = {
    id?: string
    userId: string
    expiresIn: number
  }

  export type refresh_tokensUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresIn?: IntFieldUpdateOperationsInput | number
  }

  export type refresh_tokensUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresIn?: IntFieldUpdateOperationsInput | number
  }

  export type attachmentCreateInput = {
    id?: string
    title: string
    url: string
    created_at?: Date | string
    links?: attachment_linkCreateNestedManyWithoutAttachmentInput
  }

  export type attachmentUncheckedCreateInput = {
    id?: string
    title: string
    url: string
    created_at?: Date | string
    links?: attachment_linkUncheckedCreateNestedManyWithoutAttachmentInput
  }

  export type attachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: attachment_linkUpdateManyWithoutAttachmentNestedInput
  }

  export type attachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: attachment_linkUncheckedUpdateManyWithoutAttachmentNestedInput
  }

  export type attachmentCreateManyInput = {
    id?: string
    title: string
    url: string
    created_at?: Date | string
  }

  export type attachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attachment_linkCreateInput = {
    id?: string
    resourceId?: string | null
    resourceType?: $Enums.RESOURSE_TYPE | null
    attachment: attachmentCreateNestedOneWithoutLinksInput
  }

  export type attachment_linkUncheckedCreateInput = {
    id?: string
    attachmentId: string
    resourceId?: string | null
    resourceType?: $Enums.RESOURSE_TYPE | null
  }

  export type attachment_linkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    resourceType?: NullableEnumRESOURSE_TYPEFieldUpdateOperationsInput | $Enums.RESOURSE_TYPE | null
    attachment?: attachmentUpdateOneRequiredWithoutLinksNestedInput
  }

  export type attachment_linkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    attachmentId?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    resourceType?: NullableEnumRESOURSE_TYPEFieldUpdateOperationsInput | $Enums.RESOURSE_TYPE | null
  }

  export type attachment_linkCreateManyInput = {
    id?: string
    attachmentId: string
    resourceId?: string | null
    resourceType?: $Enums.RESOURSE_TYPE | null
  }

  export type attachment_linkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    resourceType?: NullableEnumRESOURSE_TYPEFieldUpdateOperationsInput | $Enums.RESOURSE_TYPE | null
  }

  export type attachment_linkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    attachmentId?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    resourceType?: NullableEnumRESOURSE_TYPEFieldUpdateOperationsInput | $Enums.RESOURSE_TYPE | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumROLEFilter<$PrismaModel = never> = {
    equals?: $Enums.ROLE | EnumROLEFieldRefInput<$PrismaModel>
    in?: $Enums.ROLE[] | ListEnumROLEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ROLE[] | ListEnumROLEFieldRefInput<$PrismaModel>
    not?: NestedEnumROLEFilter<$PrismaModel> | $Enums.ROLE
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SnacksListRelationFilter = {
    every?: snacksWhereInput
    some?: snacksWhereInput
    none?: snacksWhereInput
  }

  export type FavoritesListRelationFilter = {
    every?: favoritesWhereInput
    some?: favoritesWhereInput
    none?: favoritesWhereInput
  }

  export type Refresh_tokensNullableScalarRelationFilter = {
    is?: refresh_tokensWhereInput | null
    isNot?: refresh_tokensWhereInput | null
  }

  export type snacksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type favoritesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumROLEWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ROLE | EnumROLEFieldRefInput<$PrismaModel>
    in?: $Enums.ROLE[] | ListEnumROLEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ROLE[] | ListEnumROLEFieldRefInput<$PrismaModel>
    not?: NestedEnumROLEWithAggregatesFilter<$PrismaModel> | $Enums.ROLE
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumROLEFilter<$PrismaModel>
    _max?: NestedEnumROLEFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type snacksCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    ingredients?: SortOrder
    price?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    userId?: SortOrder
  }

  export type snacksAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type snacksMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    price?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    userId?: SortOrder
  }

  export type snacksMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    price?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    userId?: SortOrder
  }

  export type snacksSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type SnacksScalarRelationFilter = {
    is?: snacksWhereInput
    isNot?: snacksWhereInput
  }

  export type favoritesCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    snackId?: SortOrder
  }

  export type favoritesMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    snackId?: SortOrder
  }

  export type favoritesMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    snackId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type refresh_tokensCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresIn?: SortOrder
  }

  export type refresh_tokensAvgOrderByAggregateInput = {
    expiresIn?: SortOrder
  }

  export type refresh_tokensMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresIn?: SortOrder
  }

  export type refresh_tokensMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresIn?: SortOrder
  }

  export type refresh_tokensSumOrderByAggregateInput = {
    expiresIn?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type Attachment_linkListRelationFilter = {
    every?: attachment_linkWhereInput
    some?: attachment_linkWhereInput
    none?: attachment_linkWhereInput
  }

  export type attachment_linkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type attachmentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
  }

  export type attachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
  }

  export type attachmentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRESOURSE_TYPENullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RESOURSE_TYPE | EnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    in?: $Enums.RESOURSE_TYPE[] | ListEnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RESOURSE_TYPE[] | ListEnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRESOURSE_TYPENullableFilter<$PrismaModel> | $Enums.RESOURSE_TYPE | null
  }

  export type AttachmentScalarRelationFilter = {
    is?: attachmentWhereInput
    isNot?: attachmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type attachment_linkCountOrderByAggregateInput = {
    id?: SortOrder
    attachmentId?: SortOrder
    resourceId?: SortOrder
    resourceType?: SortOrder
  }

  export type attachment_linkMaxOrderByAggregateInput = {
    id?: SortOrder
    attachmentId?: SortOrder
    resourceId?: SortOrder
    resourceType?: SortOrder
  }

  export type attachment_linkMinOrderByAggregateInput = {
    id?: SortOrder
    attachmentId?: SortOrder
    resourceId?: SortOrder
    resourceType?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRESOURSE_TYPENullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RESOURSE_TYPE | EnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    in?: $Enums.RESOURSE_TYPE[] | ListEnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RESOURSE_TYPE[] | ListEnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRESOURSE_TYPENullableWithAggregatesFilter<$PrismaModel> | $Enums.RESOURSE_TYPE | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRESOURSE_TYPENullableFilter<$PrismaModel>
    _max?: NestedEnumRESOURSE_TYPENullableFilter<$PrismaModel>
  }

  export type snacksCreateNestedManyWithoutUserInput = {
    create?: XOR<snacksCreateWithoutUserInput, snacksUncheckedCreateWithoutUserInput> | snacksCreateWithoutUserInput[] | snacksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: snacksCreateOrConnectWithoutUserInput | snacksCreateOrConnectWithoutUserInput[]
    createMany?: snacksCreateManyUserInputEnvelope
    connect?: snacksWhereUniqueInput | snacksWhereUniqueInput[]
  }

  export type favoritesCreateNestedManyWithoutUserInput = {
    create?: XOR<favoritesCreateWithoutUserInput, favoritesUncheckedCreateWithoutUserInput> | favoritesCreateWithoutUserInput[] | favoritesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: favoritesCreateOrConnectWithoutUserInput | favoritesCreateOrConnectWithoutUserInput[]
    createMany?: favoritesCreateManyUserInputEnvelope
    connect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
  }

  export type refresh_tokensCreateNestedOneWithoutUserInput = {
    create?: XOR<refresh_tokensCreateWithoutUserInput, refresh_tokensUncheckedCreateWithoutUserInput>
    connectOrCreate?: refresh_tokensCreateOrConnectWithoutUserInput
    connect?: refresh_tokensWhereUniqueInput
  }

  export type snacksUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<snacksCreateWithoutUserInput, snacksUncheckedCreateWithoutUserInput> | snacksCreateWithoutUserInput[] | snacksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: snacksCreateOrConnectWithoutUserInput | snacksCreateOrConnectWithoutUserInput[]
    createMany?: snacksCreateManyUserInputEnvelope
    connect?: snacksWhereUniqueInput | snacksWhereUniqueInput[]
  }

  export type favoritesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<favoritesCreateWithoutUserInput, favoritesUncheckedCreateWithoutUserInput> | favoritesCreateWithoutUserInput[] | favoritesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: favoritesCreateOrConnectWithoutUserInput | favoritesCreateOrConnectWithoutUserInput[]
    createMany?: favoritesCreateManyUserInputEnvelope
    connect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
  }

  export type refresh_tokensUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<refresh_tokensCreateWithoutUserInput, refresh_tokensUncheckedCreateWithoutUserInput>
    connectOrCreate?: refresh_tokensCreateOrConnectWithoutUserInput
    connect?: refresh_tokensWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumROLEFieldUpdateOperationsInput = {
    set?: $Enums.ROLE
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type snacksUpdateManyWithoutUserNestedInput = {
    create?: XOR<snacksCreateWithoutUserInput, snacksUncheckedCreateWithoutUserInput> | snacksCreateWithoutUserInput[] | snacksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: snacksCreateOrConnectWithoutUserInput | snacksCreateOrConnectWithoutUserInput[]
    upsert?: snacksUpsertWithWhereUniqueWithoutUserInput | snacksUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: snacksCreateManyUserInputEnvelope
    set?: snacksWhereUniqueInput | snacksWhereUniqueInput[]
    disconnect?: snacksWhereUniqueInput | snacksWhereUniqueInput[]
    delete?: snacksWhereUniqueInput | snacksWhereUniqueInput[]
    connect?: snacksWhereUniqueInput | snacksWhereUniqueInput[]
    update?: snacksUpdateWithWhereUniqueWithoutUserInput | snacksUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: snacksUpdateManyWithWhereWithoutUserInput | snacksUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: snacksScalarWhereInput | snacksScalarWhereInput[]
  }

  export type favoritesUpdateManyWithoutUserNestedInput = {
    create?: XOR<favoritesCreateWithoutUserInput, favoritesUncheckedCreateWithoutUserInput> | favoritesCreateWithoutUserInput[] | favoritesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: favoritesCreateOrConnectWithoutUserInput | favoritesCreateOrConnectWithoutUserInput[]
    upsert?: favoritesUpsertWithWhereUniqueWithoutUserInput | favoritesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: favoritesCreateManyUserInputEnvelope
    set?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    disconnect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    delete?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    connect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    update?: favoritesUpdateWithWhereUniqueWithoutUserInput | favoritesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: favoritesUpdateManyWithWhereWithoutUserInput | favoritesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: favoritesScalarWhereInput | favoritesScalarWhereInput[]
  }

  export type refresh_tokensUpdateOneWithoutUserNestedInput = {
    create?: XOR<refresh_tokensCreateWithoutUserInput, refresh_tokensUncheckedCreateWithoutUserInput>
    connectOrCreate?: refresh_tokensCreateOrConnectWithoutUserInput
    upsert?: refresh_tokensUpsertWithoutUserInput
    disconnect?: refresh_tokensWhereInput | boolean
    delete?: refresh_tokensWhereInput | boolean
    connect?: refresh_tokensWhereUniqueInput
    update?: XOR<XOR<refresh_tokensUpdateToOneWithWhereWithoutUserInput, refresh_tokensUpdateWithoutUserInput>, refresh_tokensUncheckedUpdateWithoutUserInput>
  }

  export type snacksUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<snacksCreateWithoutUserInput, snacksUncheckedCreateWithoutUserInput> | snacksCreateWithoutUserInput[] | snacksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: snacksCreateOrConnectWithoutUserInput | snacksCreateOrConnectWithoutUserInput[]
    upsert?: snacksUpsertWithWhereUniqueWithoutUserInput | snacksUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: snacksCreateManyUserInputEnvelope
    set?: snacksWhereUniqueInput | snacksWhereUniqueInput[]
    disconnect?: snacksWhereUniqueInput | snacksWhereUniqueInput[]
    delete?: snacksWhereUniqueInput | snacksWhereUniqueInput[]
    connect?: snacksWhereUniqueInput | snacksWhereUniqueInput[]
    update?: snacksUpdateWithWhereUniqueWithoutUserInput | snacksUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: snacksUpdateManyWithWhereWithoutUserInput | snacksUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: snacksScalarWhereInput | snacksScalarWhereInput[]
  }

  export type favoritesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<favoritesCreateWithoutUserInput, favoritesUncheckedCreateWithoutUserInput> | favoritesCreateWithoutUserInput[] | favoritesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: favoritesCreateOrConnectWithoutUserInput | favoritesCreateOrConnectWithoutUserInput[]
    upsert?: favoritesUpsertWithWhereUniqueWithoutUserInput | favoritesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: favoritesCreateManyUserInputEnvelope
    set?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    disconnect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    delete?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    connect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    update?: favoritesUpdateWithWhereUniqueWithoutUserInput | favoritesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: favoritesUpdateManyWithWhereWithoutUserInput | favoritesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: favoritesScalarWhereInput | favoritesScalarWhereInput[]
  }

  export type refresh_tokensUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<refresh_tokensCreateWithoutUserInput, refresh_tokensUncheckedCreateWithoutUserInput>
    connectOrCreate?: refresh_tokensCreateOrConnectWithoutUserInput
    upsert?: refresh_tokensUpsertWithoutUserInput
    disconnect?: refresh_tokensWhereInput | boolean
    delete?: refresh_tokensWhereInput | boolean
    connect?: refresh_tokensWhereUniqueInput
    update?: XOR<XOR<refresh_tokensUpdateToOneWithWhereWithoutUserInput, refresh_tokensUpdateWithoutUserInput>, refresh_tokensUncheckedUpdateWithoutUserInput>
  }

  export type snacksCreateingredientsInput = {
    set: string[]
  }

  export type usersCreateNestedOneWithoutSnacksInput = {
    create?: XOR<usersCreateWithoutSnacksInput, usersUncheckedCreateWithoutSnacksInput>
    connectOrCreate?: usersCreateOrConnectWithoutSnacksInput
    connect?: usersWhereUniqueInput
  }

  export type favoritesCreateNestedManyWithoutSnackInput = {
    create?: XOR<favoritesCreateWithoutSnackInput, favoritesUncheckedCreateWithoutSnackInput> | favoritesCreateWithoutSnackInput[] | favoritesUncheckedCreateWithoutSnackInput[]
    connectOrCreate?: favoritesCreateOrConnectWithoutSnackInput | favoritesCreateOrConnectWithoutSnackInput[]
    createMany?: favoritesCreateManySnackInputEnvelope
    connect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
  }

  export type favoritesUncheckedCreateNestedManyWithoutSnackInput = {
    create?: XOR<favoritesCreateWithoutSnackInput, favoritesUncheckedCreateWithoutSnackInput> | favoritesCreateWithoutSnackInput[] | favoritesUncheckedCreateWithoutSnackInput[]
    connectOrCreate?: favoritesCreateOrConnectWithoutSnackInput | favoritesCreateOrConnectWithoutSnackInput[]
    createMany?: favoritesCreateManySnackInputEnvelope
    connect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
  }

  export type snacksUpdateingredientsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateOneRequiredWithoutSnacksNestedInput = {
    create?: XOR<usersCreateWithoutSnacksInput, usersUncheckedCreateWithoutSnacksInput>
    connectOrCreate?: usersCreateOrConnectWithoutSnacksInput
    upsert?: usersUpsertWithoutSnacksInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutSnacksInput, usersUpdateWithoutSnacksInput>, usersUncheckedUpdateWithoutSnacksInput>
  }

  export type favoritesUpdateManyWithoutSnackNestedInput = {
    create?: XOR<favoritesCreateWithoutSnackInput, favoritesUncheckedCreateWithoutSnackInput> | favoritesCreateWithoutSnackInput[] | favoritesUncheckedCreateWithoutSnackInput[]
    connectOrCreate?: favoritesCreateOrConnectWithoutSnackInput | favoritesCreateOrConnectWithoutSnackInput[]
    upsert?: favoritesUpsertWithWhereUniqueWithoutSnackInput | favoritesUpsertWithWhereUniqueWithoutSnackInput[]
    createMany?: favoritesCreateManySnackInputEnvelope
    set?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    disconnect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    delete?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    connect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    update?: favoritesUpdateWithWhereUniqueWithoutSnackInput | favoritesUpdateWithWhereUniqueWithoutSnackInput[]
    updateMany?: favoritesUpdateManyWithWhereWithoutSnackInput | favoritesUpdateManyWithWhereWithoutSnackInput[]
    deleteMany?: favoritesScalarWhereInput | favoritesScalarWhereInput[]
  }

  export type favoritesUncheckedUpdateManyWithoutSnackNestedInput = {
    create?: XOR<favoritesCreateWithoutSnackInput, favoritesUncheckedCreateWithoutSnackInput> | favoritesCreateWithoutSnackInput[] | favoritesUncheckedCreateWithoutSnackInput[]
    connectOrCreate?: favoritesCreateOrConnectWithoutSnackInput | favoritesCreateOrConnectWithoutSnackInput[]
    upsert?: favoritesUpsertWithWhereUniqueWithoutSnackInput | favoritesUpsertWithWhereUniqueWithoutSnackInput[]
    createMany?: favoritesCreateManySnackInputEnvelope
    set?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    disconnect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    delete?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    connect?: favoritesWhereUniqueInput | favoritesWhereUniqueInput[]
    update?: favoritesUpdateWithWhereUniqueWithoutSnackInput | favoritesUpdateWithWhereUniqueWithoutSnackInput[]
    updateMany?: favoritesUpdateManyWithWhereWithoutSnackInput | favoritesUpdateManyWithWhereWithoutSnackInput[]
    deleteMany?: favoritesScalarWhereInput | favoritesScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutFavoriteInput = {
    create?: XOR<usersCreateWithoutFavoriteInput, usersUncheckedCreateWithoutFavoriteInput>
    connectOrCreate?: usersCreateOrConnectWithoutFavoriteInput
    connect?: usersWhereUniqueInput
  }

  export type snacksCreateNestedOneWithoutFavoriteInput = {
    create?: XOR<snacksCreateWithoutFavoriteInput, snacksUncheckedCreateWithoutFavoriteInput>
    connectOrCreate?: snacksCreateOrConnectWithoutFavoriteInput
    connect?: snacksWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutFavoriteNestedInput = {
    create?: XOR<usersCreateWithoutFavoriteInput, usersUncheckedCreateWithoutFavoriteInput>
    connectOrCreate?: usersCreateOrConnectWithoutFavoriteInput
    upsert?: usersUpsertWithoutFavoriteInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutFavoriteInput, usersUpdateWithoutFavoriteInput>, usersUncheckedUpdateWithoutFavoriteInput>
  }

  export type snacksUpdateOneRequiredWithoutFavoriteNestedInput = {
    create?: XOR<snacksCreateWithoutFavoriteInput, snacksUncheckedCreateWithoutFavoriteInput>
    connectOrCreate?: snacksCreateOrConnectWithoutFavoriteInput
    upsert?: snacksUpsertWithoutFavoriteInput
    connect?: snacksWhereUniqueInput
    update?: XOR<XOR<snacksUpdateToOneWithWhereWithoutFavoriteInput, snacksUpdateWithoutFavoriteInput>, snacksUncheckedUpdateWithoutFavoriteInput>
  }

  export type usersCreateNestedOneWithoutRefresh_tokenInput = {
    create?: XOR<usersCreateWithoutRefresh_tokenInput, usersUncheckedCreateWithoutRefresh_tokenInput>
    connectOrCreate?: usersCreateOrConnectWithoutRefresh_tokenInput
    connect?: usersWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateOneRequiredWithoutRefresh_tokenNestedInput = {
    create?: XOR<usersCreateWithoutRefresh_tokenInput, usersUncheckedCreateWithoutRefresh_tokenInput>
    connectOrCreate?: usersCreateOrConnectWithoutRefresh_tokenInput
    upsert?: usersUpsertWithoutRefresh_tokenInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutRefresh_tokenInput, usersUpdateWithoutRefresh_tokenInput>, usersUncheckedUpdateWithoutRefresh_tokenInput>
  }

  export type attachment_linkCreateNestedManyWithoutAttachmentInput = {
    create?: XOR<attachment_linkCreateWithoutAttachmentInput, attachment_linkUncheckedCreateWithoutAttachmentInput> | attachment_linkCreateWithoutAttachmentInput[] | attachment_linkUncheckedCreateWithoutAttachmentInput[]
    connectOrCreate?: attachment_linkCreateOrConnectWithoutAttachmentInput | attachment_linkCreateOrConnectWithoutAttachmentInput[]
    createMany?: attachment_linkCreateManyAttachmentInputEnvelope
    connect?: attachment_linkWhereUniqueInput | attachment_linkWhereUniqueInput[]
  }

  export type attachment_linkUncheckedCreateNestedManyWithoutAttachmentInput = {
    create?: XOR<attachment_linkCreateWithoutAttachmentInput, attachment_linkUncheckedCreateWithoutAttachmentInput> | attachment_linkCreateWithoutAttachmentInput[] | attachment_linkUncheckedCreateWithoutAttachmentInput[]
    connectOrCreate?: attachment_linkCreateOrConnectWithoutAttachmentInput | attachment_linkCreateOrConnectWithoutAttachmentInput[]
    createMany?: attachment_linkCreateManyAttachmentInputEnvelope
    connect?: attachment_linkWhereUniqueInput | attachment_linkWhereUniqueInput[]
  }

  export type attachment_linkUpdateManyWithoutAttachmentNestedInput = {
    create?: XOR<attachment_linkCreateWithoutAttachmentInput, attachment_linkUncheckedCreateWithoutAttachmentInput> | attachment_linkCreateWithoutAttachmentInput[] | attachment_linkUncheckedCreateWithoutAttachmentInput[]
    connectOrCreate?: attachment_linkCreateOrConnectWithoutAttachmentInput | attachment_linkCreateOrConnectWithoutAttachmentInput[]
    upsert?: attachment_linkUpsertWithWhereUniqueWithoutAttachmentInput | attachment_linkUpsertWithWhereUniqueWithoutAttachmentInput[]
    createMany?: attachment_linkCreateManyAttachmentInputEnvelope
    set?: attachment_linkWhereUniqueInput | attachment_linkWhereUniqueInput[]
    disconnect?: attachment_linkWhereUniqueInput | attachment_linkWhereUniqueInput[]
    delete?: attachment_linkWhereUniqueInput | attachment_linkWhereUniqueInput[]
    connect?: attachment_linkWhereUniqueInput | attachment_linkWhereUniqueInput[]
    update?: attachment_linkUpdateWithWhereUniqueWithoutAttachmentInput | attachment_linkUpdateWithWhereUniqueWithoutAttachmentInput[]
    updateMany?: attachment_linkUpdateManyWithWhereWithoutAttachmentInput | attachment_linkUpdateManyWithWhereWithoutAttachmentInput[]
    deleteMany?: attachment_linkScalarWhereInput | attachment_linkScalarWhereInput[]
  }

  export type attachment_linkUncheckedUpdateManyWithoutAttachmentNestedInput = {
    create?: XOR<attachment_linkCreateWithoutAttachmentInput, attachment_linkUncheckedCreateWithoutAttachmentInput> | attachment_linkCreateWithoutAttachmentInput[] | attachment_linkUncheckedCreateWithoutAttachmentInput[]
    connectOrCreate?: attachment_linkCreateOrConnectWithoutAttachmentInput | attachment_linkCreateOrConnectWithoutAttachmentInput[]
    upsert?: attachment_linkUpsertWithWhereUniqueWithoutAttachmentInput | attachment_linkUpsertWithWhereUniqueWithoutAttachmentInput[]
    createMany?: attachment_linkCreateManyAttachmentInputEnvelope
    set?: attachment_linkWhereUniqueInput | attachment_linkWhereUniqueInput[]
    disconnect?: attachment_linkWhereUniqueInput | attachment_linkWhereUniqueInput[]
    delete?: attachment_linkWhereUniqueInput | attachment_linkWhereUniqueInput[]
    connect?: attachment_linkWhereUniqueInput | attachment_linkWhereUniqueInput[]
    update?: attachment_linkUpdateWithWhereUniqueWithoutAttachmentInput | attachment_linkUpdateWithWhereUniqueWithoutAttachmentInput[]
    updateMany?: attachment_linkUpdateManyWithWhereWithoutAttachmentInput | attachment_linkUpdateManyWithWhereWithoutAttachmentInput[]
    deleteMany?: attachment_linkScalarWhereInput | attachment_linkScalarWhereInput[]
  }

  export type attachmentCreateNestedOneWithoutLinksInput = {
    create?: XOR<attachmentCreateWithoutLinksInput, attachmentUncheckedCreateWithoutLinksInput>
    connectOrCreate?: attachmentCreateOrConnectWithoutLinksInput
    connect?: attachmentWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumRESOURSE_TYPEFieldUpdateOperationsInput = {
    set?: $Enums.RESOURSE_TYPE | null
  }

  export type attachmentUpdateOneRequiredWithoutLinksNestedInput = {
    create?: XOR<attachmentCreateWithoutLinksInput, attachmentUncheckedCreateWithoutLinksInput>
    connectOrCreate?: attachmentCreateOrConnectWithoutLinksInput
    upsert?: attachmentUpsertWithoutLinksInput
    connect?: attachmentWhereUniqueInput
    update?: XOR<XOR<attachmentUpdateToOneWithWhereWithoutLinksInput, attachmentUpdateWithoutLinksInput>, attachmentUncheckedUpdateWithoutLinksInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumROLEFilter<$PrismaModel = never> = {
    equals?: $Enums.ROLE | EnumROLEFieldRefInput<$PrismaModel>
    in?: $Enums.ROLE[] | ListEnumROLEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ROLE[] | ListEnumROLEFieldRefInput<$PrismaModel>
    not?: NestedEnumROLEFilter<$PrismaModel> | $Enums.ROLE
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumROLEWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ROLE | EnumROLEFieldRefInput<$PrismaModel>
    in?: $Enums.ROLE[] | ListEnumROLEFieldRefInput<$PrismaModel>
    notIn?: $Enums.ROLE[] | ListEnumROLEFieldRefInput<$PrismaModel>
    not?: NestedEnumROLEWithAggregatesFilter<$PrismaModel> | $Enums.ROLE
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumROLEFilter<$PrismaModel>
    _max?: NestedEnumROLEFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRESOURSE_TYPENullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RESOURSE_TYPE | EnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    in?: $Enums.RESOURSE_TYPE[] | ListEnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RESOURSE_TYPE[] | ListEnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRESOURSE_TYPENullableFilter<$PrismaModel> | $Enums.RESOURSE_TYPE | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRESOURSE_TYPENullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RESOURSE_TYPE | EnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    in?: $Enums.RESOURSE_TYPE[] | ListEnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RESOURSE_TYPE[] | ListEnumRESOURSE_TYPEFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRESOURSE_TYPENullableWithAggregatesFilter<$PrismaModel> | $Enums.RESOURSE_TYPE | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRESOURSE_TYPENullableFilter<$PrismaModel>
    _max?: NestedEnumRESOURSE_TYPENullableFilter<$PrismaModel>
  }

  export type snacksCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    category: string
    ingredients?: snacksCreateingredientsInput | string[]
    price: number
    created_at?: Date | string
    updated_at?: Date | string
    favorite?: favoritesCreateNestedManyWithoutSnackInput
  }

  export type snacksUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    category: string
    ingredients?: snacksCreateingredientsInput | string[]
    price: number
    created_at?: Date | string
    updated_at?: Date | string
    favorite?: favoritesUncheckedCreateNestedManyWithoutSnackInput
  }

  export type snacksCreateOrConnectWithoutUserInput = {
    where: snacksWhereUniqueInput
    create: XOR<snacksCreateWithoutUserInput, snacksUncheckedCreateWithoutUserInput>
  }

  export type snacksCreateManyUserInputEnvelope = {
    data: snacksCreateManyUserInput | snacksCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type favoritesCreateWithoutUserInput = {
    id?: string
    snack: snacksCreateNestedOneWithoutFavoriteInput
  }

  export type favoritesUncheckedCreateWithoutUserInput = {
    id?: string
    snackId: string
  }

  export type favoritesCreateOrConnectWithoutUserInput = {
    where: favoritesWhereUniqueInput
    create: XOR<favoritesCreateWithoutUserInput, favoritesUncheckedCreateWithoutUserInput>
  }

  export type favoritesCreateManyUserInputEnvelope = {
    data: favoritesCreateManyUserInput | favoritesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type refresh_tokensCreateWithoutUserInput = {
    id?: string
    expiresIn: number
  }

  export type refresh_tokensUncheckedCreateWithoutUserInput = {
    id?: string
    expiresIn: number
  }

  export type refresh_tokensCreateOrConnectWithoutUserInput = {
    where: refresh_tokensWhereUniqueInput
    create: XOR<refresh_tokensCreateWithoutUserInput, refresh_tokensUncheckedCreateWithoutUserInput>
  }

  export type snacksUpsertWithWhereUniqueWithoutUserInput = {
    where: snacksWhereUniqueInput
    update: XOR<snacksUpdateWithoutUserInput, snacksUncheckedUpdateWithoutUserInput>
    create: XOR<snacksCreateWithoutUserInput, snacksUncheckedCreateWithoutUserInput>
  }

  export type snacksUpdateWithWhereUniqueWithoutUserInput = {
    where: snacksWhereUniqueInput
    data: XOR<snacksUpdateWithoutUserInput, snacksUncheckedUpdateWithoutUserInput>
  }

  export type snacksUpdateManyWithWhereWithoutUserInput = {
    where: snacksScalarWhereInput
    data: XOR<snacksUpdateManyMutationInput, snacksUncheckedUpdateManyWithoutUserInput>
  }

  export type snacksScalarWhereInput = {
    AND?: snacksScalarWhereInput | snacksScalarWhereInput[]
    OR?: snacksScalarWhereInput[]
    NOT?: snacksScalarWhereInput | snacksScalarWhereInput[]
    id?: StringFilter<"snacks"> | string
    title?: StringFilter<"snacks"> | string
    description?: StringFilter<"snacks"> | string
    category?: StringFilter<"snacks"> | string
    ingredients?: StringNullableListFilter<"snacks">
    price?: FloatFilter<"snacks"> | number
    created_at?: DateTimeFilter<"snacks"> | Date | string
    updated_at?: DateTimeFilter<"snacks"> | Date | string
    userId?: StringFilter<"snacks"> | string
  }

  export type favoritesUpsertWithWhereUniqueWithoutUserInput = {
    where: favoritesWhereUniqueInput
    update: XOR<favoritesUpdateWithoutUserInput, favoritesUncheckedUpdateWithoutUserInput>
    create: XOR<favoritesCreateWithoutUserInput, favoritesUncheckedCreateWithoutUserInput>
  }

  export type favoritesUpdateWithWhereUniqueWithoutUserInput = {
    where: favoritesWhereUniqueInput
    data: XOR<favoritesUpdateWithoutUserInput, favoritesUncheckedUpdateWithoutUserInput>
  }

  export type favoritesUpdateManyWithWhereWithoutUserInput = {
    where: favoritesScalarWhereInput
    data: XOR<favoritesUpdateManyMutationInput, favoritesUncheckedUpdateManyWithoutUserInput>
  }

  export type favoritesScalarWhereInput = {
    AND?: favoritesScalarWhereInput | favoritesScalarWhereInput[]
    OR?: favoritesScalarWhereInput[]
    NOT?: favoritesScalarWhereInput | favoritesScalarWhereInput[]
    id?: StringFilter<"favorites"> | string
    userId?: StringFilter<"favorites"> | string
    snackId?: StringFilter<"favorites"> | string
  }

  export type refresh_tokensUpsertWithoutUserInput = {
    update: XOR<refresh_tokensUpdateWithoutUserInput, refresh_tokensUncheckedUpdateWithoutUserInput>
    create: XOR<refresh_tokensCreateWithoutUserInput, refresh_tokensUncheckedCreateWithoutUserInput>
    where?: refresh_tokensWhereInput
  }

  export type refresh_tokensUpdateToOneWithWhereWithoutUserInput = {
    where?: refresh_tokensWhereInput
    data: XOR<refresh_tokensUpdateWithoutUserInput, refresh_tokensUncheckedUpdateWithoutUserInput>
  }

  export type refresh_tokensUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresIn?: IntFieldUpdateOperationsInput | number
  }

  export type refresh_tokensUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresIn?: IntFieldUpdateOperationsInput | number
  }

  export type usersCreateWithoutSnacksInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.ROLE
    created_at?: Date | string
    updated_at?: Date | string
    favorite?: favoritesCreateNestedManyWithoutUserInput
    refresh_token?: refresh_tokensCreateNestedOneWithoutUserInput
  }

  export type usersUncheckedCreateWithoutSnacksInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.ROLE
    created_at?: Date | string
    updated_at?: Date | string
    favorite?: favoritesUncheckedCreateNestedManyWithoutUserInput
    refresh_token?: refresh_tokensUncheckedCreateNestedOneWithoutUserInput
  }

  export type usersCreateOrConnectWithoutSnacksInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutSnacksInput, usersUncheckedCreateWithoutSnacksInput>
  }

  export type favoritesCreateWithoutSnackInput = {
    id?: string
    user: usersCreateNestedOneWithoutFavoriteInput
  }

  export type favoritesUncheckedCreateWithoutSnackInput = {
    id?: string
    userId: string
  }

  export type favoritesCreateOrConnectWithoutSnackInput = {
    where: favoritesWhereUniqueInput
    create: XOR<favoritesCreateWithoutSnackInput, favoritesUncheckedCreateWithoutSnackInput>
  }

  export type favoritesCreateManySnackInputEnvelope = {
    data: favoritesCreateManySnackInput | favoritesCreateManySnackInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithoutSnacksInput = {
    update: XOR<usersUpdateWithoutSnacksInput, usersUncheckedUpdateWithoutSnacksInput>
    create: XOR<usersCreateWithoutSnacksInput, usersUncheckedCreateWithoutSnacksInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutSnacksInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutSnacksInput, usersUncheckedUpdateWithoutSnacksInput>
  }

  export type usersUpdateWithoutSnacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | $Enums.ROLE
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    favorite?: favoritesUpdateManyWithoutUserNestedInput
    refresh_token?: refresh_tokensUpdateOneWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutSnacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | $Enums.ROLE
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    favorite?: favoritesUncheckedUpdateManyWithoutUserNestedInput
    refresh_token?: refresh_tokensUncheckedUpdateOneWithoutUserNestedInput
  }

  export type favoritesUpsertWithWhereUniqueWithoutSnackInput = {
    where: favoritesWhereUniqueInput
    update: XOR<favoritesUpdateWithoutSnackInput, favoritesUncheckedUpdateWithoutSnackInput>
    create: XOR<favoritesCreateWithoutSnackInput, favoritesUncheckedCreateWithoutSnackInput>
  }

  export type favoritesUpdateWithWhereUniqueWithoutSnackInput = {
    where: favoritesWhereUniqueInput
    data: XOR<favoritesUpdateWithoutSnackInput, favoritesUncheckedUpdateWithoutSnackInput>
  }

  export type favoritesUpdateManyWithWhereWithoutSnackInput = {
    where: favoritesScalarWhereInput
    data: XOR<favoritesUpdateManyMutationInput, favoritesUncheckedUpdateManyWithoutSnackInput>
  }

  export type usersCreateWithoutFavoriteInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.ROLE
    created_at?: Date | string
    updated_at?: Date | string
    snacks?: snacksCreateNestedManyWithoutUserInput
    refresh_token?: refresh_tokensCreateNestedOneWithoutUserInput
  }

  export type usersUncheckedCreateWithoutFavoriteInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.ROLE
    created_at?: Date | string
    updated_at?: Date | string
    snacks?: snacksUncheckedCreateNestedManyWithoutUserInput
    refresh_token?: refresh_tokensUncheckedCreateNestedOneWithoutUserInput
  }

  export type usersCreateOrConnectWithoutFavoriteInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutFavoriteInput, usersUncheckedCreateWithoutFavoriteInput>
  }

  export type snacksCreateWithoutFavoriteInput = {
    id?: string
    title: string
    description: string
    category: string
    ingredients?: snacksCreateingredientsInput | string[]
    price: number
    created_at?: Date | string
    updated_at?: Date | string
    user: usersCreateNestedOneWithoutSnacksInput
  }

  export type snacksUncheckedCreateWithoutFavoriteInput = {
    id?: string
    title: string
    description: string
    category: string
    ingredients?: snacksCreateingredientsInput | string[]
    price: number
    created_at?: Date | string
    updated_at?: Date | string
    userId: string
  }

  export type snacksCreateOrConnectWithoutFavoriteInput = {
    where: snacksWhereUniqueInput
    create: XOR<snacksCreateWithoutFavoriteInput, snacksUncheckedCreateWithoutFavoriteInput>
  }

  export type usersUpsertWithoutFavoriteInput = {
    update: XOR<usersUpdateWithoutFavoriteInput, usersUncheckedUpdateWithoutFavoriteInput>
    create: XOR<usersCreateWithoutFavoriteInput, usersUncheckedCreateWithoutFavoriteInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutFavoriteInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutFavoriteInput, usersUncheckedUpdateWithoutFavoriteInput>
  }

  export type usersUpdateWithoutFavoriteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | $Enums.ROLE
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    snacks?: snacksUpdateManyWithoutUserNestedInput
    refresh_token?: refresh_tokensUpdateOneWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutFavoriteInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | $Enums.ROLE
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    snacks?: snacksUncheckedUpdateManyWithoutUserNestedInput
    refresh_token?: refresh_tokensUncheckedUpdateOneWithoutUserNestedInput
  }

  export type snacksUpsertWithoutFavoriteInput = {
    update: XOR<snacksUpdateWithoutFavoriteInput, snacksUncheckedUpdateWithoutFavoriteInput>
    create: XOR<snacksCreateWithoutFavoriteInput, snacksUncheckedCreateWithoutFavoriteInput>
    where?: snacksWhereInput
  }

  export type snacksUpdateToOneWithWhereWithoutFavoriteInput = {
    where?: snacksWhereInput
    data: XOR<snacksUpdateWithoutFavoriteInput, snacksUncheckedUpdateWithoutFavoriteInput>
  }

  export type snacksUpdateWithoutFavoriteInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    ingredients?: snacksUpdateingredientsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutSnacksNestedInput
  }

  export type snacksUncheckedUpdateWithoutFavoriteInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    ingredients?: snacksUpdateingredientsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type usersCreateWithoutRefresh_tokenInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.ROLE
    created_at?: Date | string
    updated_at?: Date | string
    snacks?: snacksCreateNestedManyWithoutUserInput
    favorite?: favoritesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutRefresh_tokenInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.ROLE
    created_at?: Date | string
    updated_at?: Date | string
    snacks?: snacksUncheckedCreateNestedManyWithoutUserInput
    favorite?: favoritesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutRefresh_tokenInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutRefresh_tokenInput, usersUncheckedCreateWithoutRefresh_tokenInput>
  }

  export type usersUpsertWithoutRefresh_tokenInput = {
    update: XOR<usersUpdateWithoutRefresh_tokenInput, usersUncheckedUpdateWithoutRefresh_tokenInput>
    create: XOR<usersCreateWithoutRefresh_tokenInput, usersUncheckedCreateWithoutRefresh_tokenInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutRefresh_tokenInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutRefresh_tokenInput, usersUncheckedUpdateWithoutRefresh_tokenInput>
  }

  export type usersUpdateWithoutRefresh_tokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | $Enums.ROLE
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    snacks?: snacksUpdateManyWithoutUserNestedInput
    favorite?: favoritesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutRefresh_tokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumROLEFieldUpdateOperationsInput | $Enums.ROLE
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    snacks?: snacksUncheckedUpdateManyWithoutUserNestedInput
    favorite?: favoritesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type attachment_linkCreateWithoutAttachmentInput = {
    id?: string
    resourceId?: string | null
    resourceType?: $Enums.RESOURSE_TYPE | null
  }

  export type attachment_linkUncheckedCreateWithoutAttachmentInput = {
    id?: string
    resourceId?: string | null
    resourceType?: $Enums.RESOURSE_TYPE | null
  }

  export type attachment_linkCreateOrConnectWithoutAttachmentInput = {
    where: attachment_linkWhereUniqueInput
    create: XOR<attachment_linkCreateWithoutAttachmentInput, attachment_linkUncheckedCreateWithoutAttachmentInput>
  }

  export type attachment_linkCreateManyAttachmentInputEnvelope = {
    data: attachment_linkCreateManyAttachmentInput | attachment_linkCreateManyAttachmentInput[]
    skipDuplicates?: boolean
  }

  export type attachment_linkUpsertWithWhereUniqueWithoutAttachmentInput = {
    where: attachment_linkWhereUniqueInput
    update: XOR<attachment_linkUpdateWithoutAttachmentInput, attachment_linkUncheckedUpdateWithoutAttachmentInput>
    create: XOR<attachment_linkCreateWithoutAttachmentInput, attachment_linkUncheckedCreateWithoutAttachmentInput>
  }

  export type attachment_linkUpdateWithWhereUniqueWithoutAttachmentInput = {
    where: attachment_linkWhereUniqueInput
    data: XOR<attachment_linkUpdateWithoutAttachmentInput, attachment_linkUncheckedUpdateWithoutAttachmentInput>
  }

  export type attachment_linkUpdateManyWithWhereWithoutAttachmentInput = {
    where: attachment_linkScalarWhereInput
    data: XOR<attachment_linkUpdateManyMutationInput, attachment_linkUncheckedUpdateManyWithoutAttachmentInput>
  }

  export type attachment_linkScalarWhereInput = {
    AND?: attachment_linkScalarWhereInput | attachment_linkScalarWhereInput[]
    OR?: attachment_linkScalarWhereInput[]
    NOT?: attachment_linkScalarWhereInput | attachment_linkScalarWhereInput[]
    id?: StringFilter<"attachment_link"> | string
    attachmentId?: StringFilter<"attachment_link"> | string
    resourceId?: StringNullableFilter<"attachment_link"> | string | null
    resourceType?: EnumRESOURSE_TYPENullableFilter<"attachment_link"> | $Enums.RESOURSE_TYPE | null
  }

  export type attachmentCreateWithoutLinksInput = {
    id?: string
    title: string
    url: string
    created_at?: Date | string
  }

  export type attachmentUncheckedCreateWithoutLinksInput = {
    id?: string
    title: string
    url: string
    created_at?: Date | string
  }

  export type attachmentCreateOrConnectWithoutLinksInput = {
    where: attachmentWhereUniqueInput
    create: XOR<attachmentCreateWithoutLinksInput, attachmentUncheckedCreateWithoutLinksInput>
  }

  export type attachmentUpsertWithoutLinksInput = {
    update: XOR<attachmentUpdateWithoutLinksInput, attachmentUncheckedUpdateWithoutLinksInput>
    create: XOR<attachmentCreateWithoutLinksInput, attachmentUncheckedCreateWithoutLinksInput>
    where?: attachmentWhereInput
  }

  export type attachmentUpdateToOneWithWhereWithoutLinksInput = {
    where?: attachmentWhereInput
    data: XOR<attachmentUpdateWithoutLinksInput, attachmentUncheckedUpdateWithoutLinksInput>
  }

  export type attachmentUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type attachmentUncheckedUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type snacksCreateManyUserInput = {
    id?: string
    title: string
    description: string
    category: string
    ingredients?: snacksCreateingredientsInput | string[]
    price: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type favoritesCreateManyUserInput = {
    id?: string
    snackId: string
  }

  export type snacksUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    ingredients?: snacksUpdateingredientsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    favorite?: favoritesUpdateManyWithoutSnackNestedInput
  }

  export type snacksUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    ingredients?: snacksUpdateingredientsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    favorite?: favoritesUncheckedUpdateManyWithoutSnackNestedInput
  }

  export type snacksUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    ingredients?: snacksUpdateingredientsInput | string[]
    price?: FloatFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type favoritesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    snack?: snacksUpdateOneRequiredWithoutFavoriteNestedInput
  }

  export type favoritesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    snackId?: StringFieldUpdateOperationsInput | string
  }

  export type favoritesUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    snackId?: StringFieldUpdateOperationsInput | string
  }

  export type favoritesCreateManySnackInput = {
    id?: string
    userId: string
  }

  export type favoritesUpdateWithoutSnackInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: usersUpdateOneRequiredWithoutFavoriteNestedInput
  }

  export type favoritesUncheckedUpdateWithoutSnackInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type favoritesUncheckedUpdateManyWithoutSnackInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type attachment_linkCreateManyAttachmentInput = {
    id?: string
    resourceId?: string | null
    resourceType?: $Enums.RESOURSE_TYPE | null
  }

  export type attachment_linkUpdateWithoutAttachmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    resourceType?: NullableEnumRESOURSE_TYPEFieldUpdateOperationsInput | $Enums.RESOURSE_TYPE | null
  }

  export type attachment_linkUncheckedUpdateWithoutAttachmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    resourceType?: NullableEnumRESOURSE_TYPEFieldUpdateOperationsInput | $Enums.RESOURSE_TYPE | null
  }

  export type attachment_linkUncheckedUpdateManyWithoutAttachmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    resourceType?: NullableEnumRESOURSE_TYPEFieldUpdateOperationsInput | $Enums.RESOURSE_TYPE | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}