
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
 * Model url_new
 * 
 */
export type url_new = $Result.DefaultSelection<Prisma.$url_newPayload>
/**
 * Model url_index
 * 
 */
export type url_index = $Result.DefaultSelection<Prisma.$url_indexPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Url_news
 * const url_news = await prisma.url_new.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Url_news
   * const url_news = await prisma.url_new.findMany()
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
   * `prisma.url_new`: Exposes CRUD operations for the **url_new** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Url_news
    * const url_news = await prisma.url_new.findMany()
    * ```
    */
  get url_new(): Prisma.url_newDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.url_index`: Exposes CRUD operations for the **url_index** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Url_indices
    * const url_indices = await prisma.url_index.findMany()
    * ```
    */
  get url_index(): Prisma.url_indexDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
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
    url_new: 'url_new',
    url_index: 'url_index'
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
      modelProps: "url_new" | "url_index"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      url_new: {
        payload: Prisma.$url_newPayload<ExtArgs>
        fields: Prisma.url_newFieldRefs
        operations: {
          findUnique: {
            args: Prisma.url_newFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_newPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.url_newFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_newPayload>
          }
          findFirst: {
            args: Prisma.url_newFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_newPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.url_newFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_newPayload>
          }
          findMany: {
            args: Prisma.url_newFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_newPayload>[]
          }
          create: {
            args: Prisma.url_newCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_newPayload>
          }
          createMany: {
            args: Prisma.url_newCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.url_newCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_newPayload>[]
          }
          delete: {
            args: Prisma.url_newDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_newPayload>
          }
          update: {
            args: Prisma.url_newUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_newPayload>
          }
          deleteMany: {
            args: Prisma.url_newDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.url_newUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.url_newUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_newPayload>[]
          }
          upsert: {
            args: Prisma.url_newUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_newPayload>
          }
          aggregate: {
            args: Prisma.Url_newAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUrl_new>
          }
          groupBy: {
            args: Prisma.url_newGroupByArgs<ExtArgs>
            result: $Utils.Optional<Url_newGroupByOutputType>[]
          }
          count: {
            args: Prisma.url_newCountArgs<ExtArgs>
            result: $Utils.Optional<Url_newCountAggregateOutputType> | number
          }
        }
      }
      url_index: {
        payload: Prisma.$url_indexPayload<ExtArgs>
        fields: Prisma.url_indexFieldRefs
        operations: {
          findUnique: {
            args: Prisma.url_indexFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_indexPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.url_indexFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_indexPayload>
          }
          findFirst: {
            args: Prisma.url_indexFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_indexPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.url_indexFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_indexPayload>
          }
          findMany: {
            args: Prisma.url_indexFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_indexPayload>[]
          }
          create: {
            args: Prisma.url_indexCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_indexPayload>
          }
          createMany: {
            args: Prisma.url_indexCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.url_indexCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_indexPayload>[]
          }
          delete: {
            args: Prisma.url_indexDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_indexPayload>
          }
          update: {
            args: Prisma.url_indexUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_indexPayload>
          }
          deleteMany: {
            args: Prisma.url_indexDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.url_indexUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.url_indexUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_indexPayload>[]
          }
          upsert: {
            args: Prisma.url_indexUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$url_indexPayload>
          }
          aggregate: {
            args: Prisma.Url_indexAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUrl_index>
          }
          groupBy: {
            args: Prisma.url_indexGroupByArgs<ExtArgs>
            result: $Utils.Optional<Url_indexGroupByOutputType>[]
          }
          count: {
            args: Prisma.url_indexCountArgs<ExtArgs>
            result: $Utils.Optional<Url_indexCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
    url_new?: url_newOmit
    url_index?: url_indexOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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
   * Models
   */

  /**
   * Model url_new
   */

  export type AggregateUrl_new = {
    _count: Url_newCountAggregateOutputType | null
    _avg: Url_newAvgAggregateOutputType | null
    _sum: Url_newSumAggregateOutputType | null
    _min: Url_newMinAggregateOutputType | null
    _max: Url_newMaxAggregateOutputType | null
  }

  export type Url_newAvgAggregateOutputType = {
    id: number | null
  }

  export type Url_newSumAggregateOutputType = {
    id: number | null
  }

  export type Url_newMinAggregateOutputType = {
    id: number | null
    url: string | null
    domain: string | null
    discovered_time: Date | null
  }

  export type Url_newMaxAggregateOutputType = {
    id: number | null
    url: string | null
    domain: string | null
    discovered_time: Date | null
  }

  export type Url_newCountAggregateOutputType = {
    id: number
    url: number
    domain: number
    discovered_time: number
    _all: number
  }


  export type Url_newAvgAggregateInputType = {
    id?: true
  }

  export type Url_newSumAggregateInputType = {
    id?: true
  }

  export type Url_newMinAggregateInputType = {
    id?: true
    url?: true
    domain?: true
    discovered_time?: true
  }

  export type Url_newMaxAggregateInputType = {
    id?: true
    url?: true
    domain?: true
    discovered_time?: true
  }

  export type Url_newCountAggregateInputType = {
    id?: true
    url?: true
    domain?: true
    discovered_time?: true
    _all?: true
  }

  export type Url_newAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which url_new to aggregate.
     */
    where?: url_newWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of url_news to fetch.
     */
    orderBy?: url_newOrderByWithRelationInput | url_newOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: url_newWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` url_news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` url_news.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned url_news
    **/
    _count?: true | Url_newCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Url_newAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Url_newSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Url_newMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Url_newMaxAggregateInputType
  }

  export type GetUrl_newAggregateType<T extends Url_newAggregateArgs> = {
        [P in keyof T & keyof AggregateUrl_new]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUrl_new[P]>
      : GetScalarType<T[P], AggregateUrl_new[P]>
  }




  export type url_newGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: url_newWhereInput
    orderBy?: url_newOrderByWithAggregationInput | url_newOrderByWithAggregationInput[]
    by: Url_newScalarFieldEnum[] | Url_newScalarFieldEnum
    having?: url_newScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Url_newCountAggregateInputType | true
    _avg?: Url_newAvgAggregateInputType
    _sum?: Url_newSumAggregateInputType
    _min?: Url_newMinAggregateInputType
    _max?: Url_newMaxAggregateInputType
  }

  export type Url_newGroupByOutputType = {
    id: number
    url: string
    domain: string | null
    discovered_time: Date | null
    _count: Url_newCountAggregateOutputType | null
    _avg: Url_newAvgAggregateOutputType | null
    _sum: Url_newSumAggregateOutputType | null
    _min: Url_newMinAggregateOutputType | null
    _max: Url_newMaxAggregateOutputType | null
  }

  type GetUrl_newGroupByPayload<T extends url_newGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Url_newGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Url_newGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Url_newGroupByOutputType[P]>
            : GetScalarType<T[P], Url_newGroupByOutputType[P]>
        }
      >
    >


  export type url_newSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    domain?: boolean
    discovered_time?: boolean
  }, ExtArgs["result"]["url_new"]>

  export type url_newSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    domain?: boolean
    discovered_time?: boolean
  }, ExtArgs["result"]["url_new"]>

  export type url_newSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    domain?: boolean
    discovered_time?: boolean
  }, ExtArgs["result"]["url_new"]>

  export type url_newSelectScalar = {
    id?: boolean
    url?: boolean
    domain?: boolean
    discovered_time?: boolean
  }

  export type url_newOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "domain" | "discovered_time", ExtArgs["result"]["url_new"]>

  export type $url_newPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "url_new"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      url: string
      domain: string | null
      discovered_time: Date | null
    }, ExtArgs["result"]["url_new"]>
    composites: {}
  }

  type url_newGetPayload<S extends boolean | null | undefined | url_newDefaultArgs> = $Result.GetResult<Prisma.$url_newPayload, S>

  type url_newCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<url_newFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Url_newCountAggregateInputType | true
    }

  export interface url_newDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['url_new'], meta: { name: 'url_new' } }
    /**
     * Find zero or one Url_new that matches the filter.
     * @param {url_newFindUniqueArgs} args - Arguments to find a Url_new
     * @example
     * // Get one Url_new
     * const url_new = await prisma.url_new.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends url_newFindUniqueArgs>(args: SelectSubset<T, url_newFindUniqueArgs<ExtArgs>>): Prisma__url_newClient<$Result.GetResult<Prisma.$url_newPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Url_new that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {url_newFindUniqueOrThrowArgs} args - Arguments to find a Url_new
     * @example
     * // Get one Url_new
     * const url_new = await prisma.url_new.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends url_newFindUniqueOrThrowArgs>(args: SelectSubset<T, url_newFindUniqueOrThrowArgs<ExtArgs>>): Prisma__url_newClient<$Result.GetResult<Prisma.$url_newPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Url_new that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_newFindFirstArgs} args - Arguments to find a Url_new
     * @example
     * // Get one Url_new
     * const url_new = await prisma.url_new.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends url_newFindFirstArgs>(args?: SelectSubset<T, url_newFindFirstArgs<ExtArgs>>): Prisma__url_newClient<$Result.GetResult<Prisma.$url_newPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Url_new that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_newFindFirstOrThrowArgs} args - Arguments to find a Url_new
     * @example
     * // Get one Url_new
     * const url_new = await prisma.url_new.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends url_newFindFirstOrThrowArgs>(args?: SelectSubset<T, url_newFindFirstOrThrowArgs<ExtArgs>>): Prisma__url_newClient<$Result.GetResult<Prisma.$url_newPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Url_news that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_newFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Url_news
     * const url_news = await prisma.url_new.findMany()
     * 
     * // Get first 10 Url_news
     * const url_news = await prisma.url_new.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const url_newWithIdOnly = await prisma.url_new.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends url_newFindManyArgs>(args?: SelectSubset<T, url_newFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$url_newPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Url_new.
     * @param {url_newCreateArgs} args - Arguments to create a Url_new.
     * @example
     * // Create one Url_new
     * const Url_new = await prisma.url_new.create({
     *   data: {
     *     // ... data to create a Url_new
     *   }
     * })
     * 
     */
    create<T extends url_newCreateArgs>(args: SelectSubset<T, url_newCreateArgs<ExtArgs>>): Prisma__url_newClient<$Result.GetResult<Prisma.$url_newPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Url_news.
     * @param {url_newCreateManyArgs} args - Arguments to create many Url_news.
     * @example
     * // Create many Url_news
     * const url_new = await prisma.url_new.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends url_newCreateManyArgs>(args?: SelectSubset<T, url_newCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Url_news and returns the data saved in the database.
     * @param {url_newCreateManyAndReturnArgs} args - Arguments to create many Url_news.
     * @example
     * // Create many Url_news
     * const url_new = await prisma.url_new.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Url_news and only return the `id`
     * const url_newWithIdOnly = await prisma.url_new.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends url_newCreateManyAndReturnArgs>(args?: SelectSubset<T, url_newCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$url_newPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Url_new.
     * @param {url_newDeleteArgs} args - Arguments to delete one Url_new.
     * @example
     * // Delete one Url_new
     * const Url_new = await prisma.url_new.delete({
     *   where: {
     *     // ... filter to delete one Url_new
     *   }
     * })
     * 
     */
    delete<T extends url_newDeleteArgs>(args: SelectSubset<T, url_newDeleteArgs<ExtArgs>>): Prisma__url_newClient<$Result.GetResult<Prisma.$url_newPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Url_new.
     * @param {url_newUpdateArgs} args - Arguments to update one Url_new.
     * @example
     * // Update one Url_new
     * const url_new = await prisma.url_new.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends url_newUpdateArgs>(args: SelectSubset<T, url_newUpdateArgs<ExtArgs>>): Prisma__url_newClient<$Result.GetResult<Prisma.$url_newPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Url_news.
     * @param {url_newDeleteManyArgs} args - Arguments to filter Url_news to delete.
     * @example
     * // Delete a few Url_news
     * const { count } = await prisma.url_new.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends url_newDeleteManyArgs>(args?: SelectSubset<T, url_newDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Url_news.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_newUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Url_news
     * const url_new = await prisma.url_new.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends url_newUpdateManyArgs>(args: SelectSubset<T, url_newUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Url_news and returns the data updated in the database.
     * @param {url_newUpdateManyAndReturnArgs} args - Arguments to update many Url_news.
     * @example
     * // Update many Url_news
     * const url_new = await prisma.url_new.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Url_news and only return the `id`
     * const url_newWithIdOnly = await prisma.url_new.updateManyAndReturn({
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
    updateManyAndReturn<T extends url_newUpdateManyAndReturnArgs>(args: SelectSubset<T, url_newUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$url_newPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Url_new.
     * @param {url_newUpsertArgs} args - Arguments to update or create a Url_new.
     * @example
     * // Update or create a Url_new
     * const url_new = await prisma.url_new.upsert({
     *   create: {
     *     // ... data to create a Url_new
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Url_new we want to update
     *   }
     * })
     */
    upsert<T extends url_newUpsertArgs>(args: SelectSubset<T, url_newUpsertArgs<ExtArgs>>): Prisma__url_newClient<$Result.GetResult<Prisma.$url_newPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Url_news.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_newCountArgs} args - Arguments to filter Url_news to count.
     * @example
     * // Count the number of Url_news
     * const count = await prisma.url_new.count({
     *   where: {
     *     // ... the filter for the Url_news we want to count
     *   }
     * })
    **/
    count<T extends url_newCountArgs>(
      args?: Subset<T, url_newCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Url_newCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Url_new.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Url_newAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Url_newAggregateArgs>(args: Subset<T, Url_newAggregateArgs>): Prisma.PrismaPromise<GetUrl_newAggregateType<T>>

    /**
     * Group by Url_new.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_newGroupByArgs} args - Group by arguments.
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
      T extends url_newGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: url_newGroupByArgs['orderBy'] }
        : { orderBy?: url_newGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, url_newGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUrl_newGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the url_new model
   */
  readonly fields: url_newFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for url_new.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__url_newClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the url_new model
   */
  interface url_newFieldRefs {
    readonly id: FieldRef<"url_new", 'Int'>
    readonly url: FieldRef<"url_new", 'String'>
    readonly domain: FieldRef<"url_new", 'String'>
    readonly discovered_time: FieldRef<"url_new", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * url_new findUnique
   */
  export type url_newFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
    /**
     * Filter, which url_new to fetch.
     */
    where: url_newWhereUniqueInput
  }

  /**
   * url_new findUniqueOrThrow
   */
  export type url_newFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
    /**
     * Filter, which url_new to fetch.
     */
    where: url_newWhereUniqueInput
  }

  /**
   * url_new findFirst
   */
  export type url_newFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
    /**
     * Filter, which url_new to fetch.
     */
    where?: url_newWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of url_news to fetch.
     */
    orderBy?: url_newOrderByWithRelationInput | url_newOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for url_news.
     */
    cursor?: url_newWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` url_news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` url_news.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of url_news.
     */
    distinct?: Url_newScalarFieldEnum | Url_newScalarFieldEnum[]
  }

  /**
   * url_new findFirstOrThrow
   */
  export type url_newFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
    /**
     * Filter, which url_new to fetch.
     */
    where?: url_newWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of url_news to fetch.
     */
    orderBy?: url_newOrderByWithRelationInput | url_newOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for url_news.
     */
    cursor?: url_newWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` url_news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` url_news.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of url_news.
     */
    distinct?: Url_newScalarFieldEnum | Url_newScalarFieldEnum[]
  }

  /**
   * url_new findMany
   */
  export type url_newFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
    /**
     * Filter, which url_news to fetch.
     */
    where?: url_newWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of url_news to fetch.
     */
    orderBy?: url_newOrderByWithRelationInput | url_newOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing url_news.
     */
    cursor?: url_newWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` url_news from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` url_news.
     */
    skip?: number
    distinct?: Url_newScalarFieldEnum | Url_newScalarFieldEnum[]
  }

  /**
   * url_new create
   */
  export type url_newCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
    /**
     * The data needed to create a url_new.
     */
    data: XOR<url_newCreateInput, url_newUncheckedCreateInput>
  }

  /**
   * url_new createMany
   */
  export type url_newCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many url_news.
     */
    data: url_newCreateManyInput | url_newCreateManyInput[]
  }

  /**
   * url_new createManyAndReturn
   */
  export type url_newCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
    /**
     * The data used to create many url_news.
     */
    data: url_newCreateManyInput | url_newCreateManyInput[]
  }

  /**
   * url_new update
   */
  export type url_newUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
    /**
     * The data needed to update a url_new.
     */
    data: XOR<url_newUpdateInput, url_newUncheckedUpdateInput>
    /**
     * Choose, which url_new to update.
     */
    where: url_newWhereUniqueInput
  }

  /**
   * url_new updateMany
   */
  export type url_newUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update url_news.
     */
    data: XOR<url_newUpdateManyMutationInput, url_newUncheckedUpdateManyInput>
    /**
     * Filter which url_news to update
     */
    where?: url_newWhereInput
    /**
     * Limit how many url_news to update.
     */
    limit?: number
  }

  /**
   * url_new updateManyAndReturn
   */
  export type url_newUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
    /**
     * The data used to update url_news.
     */
    data: XOR<url_newUpdateManyMutationInput, url_newUncheckedUpdateManyInput>
    /**
     * Filter which url_news to update
     */
    where?: url_newWhereInput
    /**
     * Limit how many url_news to update.
     */
    limit?: number
  }

  /**
   * url_new upsert
   */
  export type url_newUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
    /**
     * The filter to search for the url_new to update in case it exists.
     */
    where: url_newWhereUniqueInput
    /**
     * In case the url_new found by the `where` argument doesn't exist, create a new url_new with this data.
     */
    create: XOR<url_newCreateInput, url_newUncheckedCreateInput>
    /**
     * In case the url_new was found with the provided `where` argument, update it with this data.
     */
    update: XOR<url_newUpdateInput, url_newUncheckedUpdateInput>
  }

  /**
   * url_new delete
   */
  export type url_newDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
    /**
     * Filter which url_new to delete.
     */
    where: url_newWhereUniqueInput
  }

  /**
   * url_new deleteMany
   */
  export type url_newDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which url_news to delete
     */
    where?: url_newWhereInput
    /**
     * Limit how many url_news to delete.
     */
    limit?: number
  }

  /**
   * url_new without action
   */
  export type url_newDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_new
     */
    select?: url_newSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_new
     */
    omit?: url_newOmit<ExtArgs> | null
  }


  /**
   * Model url_index
   */

  export type AggregateUrl_index = {
    _count: Url_indexCountAggregateOutputType | null
    _avg: Url_indexAvgAggregateOutputType | null
    _sum: Url_indexSumAggregateOutputType | null
    _min: Url_indexMinAggregateOutputType | null
    _max: Url_indexMaxAggregateOutputType | null
  }

  export type Url_indexAvgAggregateOutputType = {
    id: number | null
  }

  export type Url_indexSumAggregateOutputType = {
    id: number | null
  }

  export type Url_indexMinAggregateOutputType = {
    id: number | null
    url: string | null
    domain: string | null
    tld: string | null
    markdown_path: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tags: string | null
  }

  export type Url_indexMaxAggregateOutputType = {
    id: number | null
    url: string | null
    domain: string | null
    tld: string | null
    markdown_path: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tags: string | null
  }

  export type Url_indexCountAggregateOutputType = {
    id: number
    url: number
    domain: number
    tld: number
    markdown_path: number
    status: number
    createdAt: number
    updatedAt: number
    tags: number
    _all: number
  }


  export type Url_indexAvgAggregateInputType = {
    id?: true
  }

  export type Url_indexSumAggregateInputType = {
    id?: true
  }

  export type Url_indexMinAggregateInputType = {
    id?: true
    url?: true
    domain?: true
    tld?: true
    markdown_path?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    tags?: true
  }

  export type Url_indexMaxAggregateInputType = {
    id?: true
    url?: true
    domain?: true
    tld?: true
    markdown_path?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    tags?: true
  }

  export type Url_indexCountAggregateInputType = {
    id?: true
    url?: true
    domain?: true
    tld?: true
    markdown_path?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    tags?: true
    _all?: true
  }

  export type Url_indexAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which url_index to aggregate.
     */
    where?: url_indexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of url_indices to fetch.
     */
    orderBy?: url_indexOrderByWithRelationInput | url_indexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: url_indexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` url_indices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` url_indices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned url_indices
    **/
    _count?: true | Url_indexCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Url_indexAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Url_indexSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Url_indexMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Url_indexMaxAggregateInputType
  }

  export type GetUrl_indexAggregateType<T extends Url_indexAggregateArgs> = {
        [P in keyof T & keyof AggregateUrl_index]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUrl_index[P]>
      : GetScalarType<T[P], AggregateUrl_index[P]>
  }




  export type url_indexGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: url_indexWhereInput
    orderBy?: url_indexOrderByWithAggregationInput | url_indexOrderByWithAggregationInput[]
    by: Url_indexScalarFieldEnum[] | Url_indexScalarFieldEnum
    having?: url_indexScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Url_indexCountAggregateInputType | true
    _avg?: Url_indexAvgAggregateInputType
    _sum?: Url_indexSumAggregateInputType
    _min?: Url_indexMinAggregateInputType
    _max?: Url_indexMaxAggregateInputType
  }

  export type Url_indexGroupByOutputType = {
    id: number
    url: string
    domain: string | null
    tld: string | null
    markdown_path: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    tags: string | null
    _count: Url_indexCountAggregateOutputType | null
    _avg: Url_indexAvgAggregateOutputType | null
    _sum: Url_indexSumAggregateOutputType | null
    _min: Url_indexMinAggregateOutputType | null
    _max: Url_indexMaxAggregateOutputType | null
  }

  type GetUrl_indexGroupByPayload<T extends url_indexGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Url_indexGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Url_indexGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Url_indexGroupByOutputType[P]>
            : GetScalarType<T[P], Url_indexGroupByOutputType[P]>
        }
      >
    >


  export type url_indexSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    domain?: boolean
    tld?: boolean
    markdown_path?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean
  }, ExtArgs["result"]["url_index"]>

  export type url_indexSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    domain?: boolean
    tld?: boolean
    markdown_path?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean
  }, ExtArgs["result"]["url_index"]>

  export type url_indexSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    domain?: boolean
    tld?: boolean
    markdown_path?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean
  }, ExtArgs["result"]["url_index"]>

  export type url_indexSelectScalar = {
    id?: boolean
    url?: boolean
    domain?: boolean
    tld?: boolean
    markdown_path?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean
  }

  export type url_indexOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "domain" | "tld" | "markdown_path" | "status" | "createdAt" | "updatedAt" | "tags", ExtArgs["result"]["url_index"]>

  export type $url_indexPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "url_index"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      url: string
      domain: string | null
      tld: string | null
      markdown_path: string | null
      status: string | null
      createdAt: Date | null
      updatedAt: Date | null
      tags: string | null
    }, ExtArgs["result"]["url_index"]>
    composites: {}
  }

  type url_indexGetPayload<S extends boolean | null | undefined | url_indexDefaultArgs> = $Result.GetResult<Prisma.$url_indexPayload, S>

  type url_indexCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<url_indexFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Url_indexCountAggregateInputType | true
    }

  export interface url_indexDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['url_index'], meta: { name: 'url_index' } }
    /**
     * Find zero or one Url_index that matches the filter.
     * @param {url_indexFindUniqueArgs} args - Arguments to find a Url_index
     * @example
     * // Get one Url_index
     * const url_index = await prisma.url_index.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends url_indexFindUniqueArgs>(args: SelectSubset<T, url_indexFindUniqueArgs<ExtArgs>>): Prisma__url_indexClient<$Result.GetResult<Prisma.$url_indexPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Url_index that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {url_indexFindUniqueOrThrowArgs} args - Arguments to find a Url_index
     * @example
     * // Get one Url_index
     * const url_index = await prisma.url_index.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends url_indexFindUniqueOrThrowArgs>(args: SelectSubset<T, url_indexFindUniqueOrThrowArgs<ExtArgs>>): Prisma__url_indexClient<$Result.GetResult<Prisma.$url_indexPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Url_index that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_indexFindFirstArgs} args - Arguments to find a Url_index
     * @example
     * // Get one Url_index
     * const url_index = await prisma.url_index.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends url_indexFindFirstArgs>(args?: SelectSubset<T, url_indexFindFirstArgs<ExtArgs>>): Prisma__url_indexClient<$Result.GetResult<Prisma.$url_indexPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Url_index that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_indexFindFirstOrThrowArgs} args - Arguments to find a Url_index
     * @example
     * // Get one Url_index
     * const url_index = await prisma.url_index.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends url_indexFindFirstOrThrowArgs>(args?: SelectSubset<T, url_indexFindFirstOrThrowArgs<ExtArgs>>): Prisma__url_indexClient<$Result.GetResult<Prisma.$url_indexPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Url_indices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_indexFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Url_indices
     * const url_indices = await prisma.url_index.findMany()
     * 
     * // Get first 10 Url_indices
     * const url_indices = await prisma.url_index.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const url_indexWithIdOnly = await prisma.url_index.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends url_indexFindManyArgs>(args?: SelectSubset<T, url_indexFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$url_indexPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Url_index.
     * @param {url_indexCreateArgs} args - Arguments to create a Url_index.
     * @example
     * // Create one Url_index
     * const Url_index = await prisma.url_index.create({
     *   data: {
     *     // ... data to create a Url_index
     *   }
     * })
     * 
     */
    create<T extends url_indexCreateArgs>(args: SelectSubset<T, url_indexCreateArgs<ExtArgs>>): Prisma__url_indexClient<$Result.GetResult<Prisma.$url_indexPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Url_indices.
     * @param {url_indexCreateManyArgs} args - Arguments to create many Url_indices.
     * @example
     * // Create many Url_indices
     * const url_index = await prisma.url_index.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends url_indexCreateManyArgs>(args?: SelectSubset<T, url_indexCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Url_indices and returns the data saved in the database.
     * @param {url_indexCreateManyAndReturnArgs} args - Arguments to create many Url_indices.
     * @example
     * // Create many Url_indices
     * const url_index = await prisma.url_index.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Url_indices and only return the `id`
     * const url_indexWithIdOnly = await prisma.url_index.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends url_indexCreateManyAndReturnArgs>(args?: SelectSubset<T, url_indexCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$url_indexPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Url_index.
     * @param {url_indexDeleteArgs} args - Arguments to delete one Url_index.
     * @example
     * // Delete one Url_index
     * const Url_index = await prisma.url_index.delete({
     *   where: {
     *     // ... filter to delete one Url_index
     *   }
     * })
     * 
     */
    delete<T extends url_indexDeleteArgs>(args: SelectSubset<T, url_indexDeleteArgs<ExtArgs>>): Prisma__url_indexClient<$Result.GetResult<Prisma.$url_indexPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Url_index.
     * @param {url_indexUpdateArgs} args - Arguments to update one Url_index.
     * @example
     * // Update one Url_index
     * const url_index = await prisma.url_index.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends url_indexUpdateArgs>(args: SelectSubset<T, url_indexUpdateArgs<ExtArgs>>): Prisma__url_indexClient<$Result.GetResult<Prisma.$url_indexPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Url_indices.
     * @param {url_indexDeleteManyArgs} args - Arguments to filter Url_indices to delete.
     * @example
     * // Delete a few Url_indices
     * const { count } = await prisma.url_index.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends url_indexDeleteManyArgs>(args?: SelectSubset<T, url_indexDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Url_indices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_indexUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Url_indices
     * const url_index = await prisma.url_index.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends url_indexUpdateManyArgs>(args: SelectSubset<T, url_indexUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Url_indices and returns the data updated in the database.
     * @param {url_indexUpdateManyAndReturnArgs} args - Arguments to update many Url_indices.
     * @example
     * // Update many Url_indices
     * const url_index = await prisma.url_index.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Url_indices and only return the `id`
     * const url_indexWithIdOnly = await prisma.url_index.updateManyAndReturn({
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
    updateManyAndReturn<T extends url_indexUpdateManyAndReturnArgs>(args: SelectSubset<T, url_indexUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$url_indexPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Url_index.
     * @param {url_indexUpsertArgs} args - Arguments to update or create a Url_index.
     * @example
     * // Update or create a Url_index
     * const url_index = await prisma.url_index.upsert({
     *   create: {
     *     // ... data to create a Url_index
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Url_index we want to update
     *   }
     * })
     */
    upsert<T extends url_indexUpsertArgs>(args: SelectSubset<T, url_indexUpsertArgs<ExtArgs>>): Prisma__url_indexClient<$Result.GetResult<Prisma.$url_indexPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Url_indices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_indexCountArgs} args - Arguments to filter Url_indices to count.
     * @example
     * // Count the number of Url_indices
     * const count = await prisma.url_index.count({
     *   where: {
     *     // ... the filter for the Url_indices we want to count
     *   }
     * })
    **/
    count<T extends url_indexCountArgs>(
      args?: Subset<T, url_indexCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Url_indexCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Url_index.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Url_indexAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Url_indexAggregateArgs>(args: Subset<T, Url_indexAggregateArgs>): Prisma.PrismaPromise<GetUrl_indexAggregateType<T>>

    /**
     * Group by Url_index.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {url_indexGroupByArgs} args - Group by arguments.
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
      T extends url_indexGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: url_indexGroupByArgs['orderBy'] }
        : { orderBy?: url_indexGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, url_indexGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUrl_indexGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the url_index model
   */
  readonly fields: url_indexFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for url_index.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__url_indexClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the url_index model
   */
  interface url_indexFieldRefs {
    readonly id: FieldRef<"url_index", 'Int'>
    readonly url: FieldRef<"url_index", 'String'>
    readonly domain: FieldRef<"url_index", 'String'>
    readonly tld: FieldRef<"url_index", 'String'>
    readonly markdown_path: FieldRef<"url_index", 'String'>
    readonly status: FieldRef<"url_index", 'String'>
    readonly createdAt: FieldRef<"url_index", 'DateTime'>
    readonly updatedAt: FieldRef<"url_index", 'DateTime'>
    readonly tags: FieldRef<"url_index", 'String'>
  }
    

  // Custom InputTypes
  /**
   * url_index findUnique
   */
  export type url_indexFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
    /**
     * Filter, which url_index to fetch.
     */
    where: url_indexWhereUniqueInput
  }

  /**
   * url_index findUniqueOrThrow
   */
  export type url_indexFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
    /**
     * Filter, which url_index to fetch.
     */
    where: url_indexWhereUniqueInput
  }

  /**
   * url_index findFirst
   */
  export type url_indexFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
    /**
     * Filter, which url_index to fetch.
     */
    where?: url_indexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of url_indices to fetch.
     */
    orderBy?: url_indexOrderByWithRelationInput | url_indexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for url_indices.
     */
    cursor?: url_indexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` url_indices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` url_indices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of url_indices.
     */
    distinct?: Url_indexScalarFieldEnum | Url_indexScalarFieldEnum[]
  }

  /**
   * url_index findFirstOrThrow
   */
  export type url_indexFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
    /**
     * Filter, which url_index to fetch.
     */
    where?: url_indexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of url_indices to fetch.
     */
    orderBy?: url_indexOrderByWithRelationInput | url_indexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for url_indices.
     */
    cursor?: url_indexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` url_indices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` url_indices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of url_indices.
     */
    distinct?: Url_indexScalarFieldEnum | Url_indexScalarFieldEnum[]
  }

  /**
   * url_index findMany
   */
  export type url_indexFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
    /**
     * Filter, which url_indices to fetch.
     */
    where?: url_indexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of url_indices to fetch.
     */
    orderBy?: url_indexOrderByWithRelationInput | url_indexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing url_indices.
     */
    cursor?: url_indexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` url_indices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` url_indices.
     */
    skip?: number
    distinct?: Url_indexScalarFieldEnum | Url_indexScalarFieldEnum[]
  }

  /**
   * url_index create
   */
  export type url_indexCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
    /**
     * The data needed to create a url_index.
     */
    data: XOR<url_indexCreateInput, url_indexUncheckedCreateInput>
  }

  /**
   * url_index createMany
   */
  export type url_indexCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many url_indices.
     */
    data: url_indexCreateManyInput | url_indexCreateManyInput[]
  }

  /**
   * url_index createManyAndReturn
   */
  export type url_indexCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
    /**
     * The data used to create many url_indices.
     */
    data: url_indexCreateManyInput | url_indexCreateManyInput[]
  }

  /**
   * url_index update
   */
  export type url_indexUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
    /**
     * The data needed to update a url_index.
     */
    data: XOR<url_indexUpdateInput, url_indexUncheckedUpdateInput>
    /**
     * Choose, which url_index to update.
     */
    where: url_indexWhereUniqueInput
  }

  /**
   * url_index updateMany
   */
  export type url_indexUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update url_indices.
     */
    data: XOR<url_indexUpdateManyMutationInput, url_indexUncheckedUpdateManyInput>
    /**
     * Filter which url_indices to update
     */
    where?: url_indexWhereInput
    /**
     * Limit how many url_indices to update.
     */
    limit?: number
  }

  /**
   * url_index updateManyAndReturn
   */
  export type url_indexUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
    /**
     * The data used to update url_indices.
     */
    data: XOR<url_indexUpdateManyMutationInput, url_indexUncheckedUpdateManyInput>
    /**
     * Filter which url_indices to update
     */
    where?: url_indexWhereInput
    /**
     * Limit how many url_indices to update.
     */
    limit?: number
  }

  /**
   * url_index upsert
   */
  export type url_indexUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
    /**
     * The filter to search for the url_index to update in case it exists.
     */
    where: url_indexWhereUniqueInput
    /**
     * In case the url_index found by the `where` argument doesn't exist, create a new url_index with this data.
     */
    create: XOR<url_indexCreateInput, url_indexUncheckedCreateInput>
    /**
     * In case the url_index was found with the provided `where` argument, update it with this data.
     */
    update: XOR<url_indexUpdateInput, url_indexUncheckedUpdateInput>
  }

  /**
   * url_index delete
   */
  export type url_indexDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
    /**
     * Filter which url_index to delete.
     */
    where: url_indexWhereUniqueInput
  }

  /**
   * url_index deleteMany
   */
  export type url_indexDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which url_indices to delete
     */
    where?: url_indexWhereInput
    /**
     * Limit how many url_indices to delete.
     */
    limit?: number
  }

  /**
   * url_index without action
   */
  export type url_indexDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the url_index
     */
    select?: url_indexSelect<ExtArgs> | null
    /**
     * Omit specific fields from the url_index
     */
    omit?: url_indexOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Url_newScalarFieldEnum: {
    id: 'id',
    url: 'url',
    domain: 'domain',
    discovered_time: 'discovered_time'
  };

  export type Url_newScalarFieldEnum = (typeof Url_newScalarFieldEnum)[keyof typeof Url_newScalarFieldEnum]


  export const Url_indexScalarFieldEnum: {
    id: 'id',
    url: 'url',
    domain: 'domain',
    tld: 'tld',
    markdown_path: 'markdown_path',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tags: 'tags'
  };

  export type Url_indexScalarFieldEnum = (typeof Url_indexScalarFieldEnum)[keyof typeof Url_indexScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type url_newWhereInput = {
    AND?: url_newWhereInput | url_newWhereInput[]
    OR?: url_newWhereInput[]
    NOT?: url_newWhereInput | url_newWhereInput[]
    id?: IntFilter<"url_new"> | number
    url?: StringFilter<"url_new"> | string
    domain?: StringNullableFilter<"url_new"> | string | null
    discovered_time?: DateTimeNullableFilter<"url_new"> | Date | string | null
  }

  export type url_newOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    domain?: SortOrderInput | SortOrder
    discovered_time?: SortOrderInput | SortOrder
  }

  export type url_newWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    url?: string
    AND?: url_newWhereInput | url_newWhereInput[]
    OR?: url_newWhereInput[]
    NOT?: url_newWhereInput | url_newWhereInput[]
    domain?: StringNullableFilter<"url_new"> | string | null
    discovered_time?: DateTimeNullableFilter<"url_new"> | Date | string | null
  }, "id" | "url">

  export type url_newOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    domain?: SortOrderInput | SortOrder
    discovered_time?: SortOrderInput | SortOrder
    _count?: url_newCountOrderByAggregateInput
    _avg?: url_newAvgOrderByAggregateInput
    _max?: url_newMaxOrderByAggregateInput
    _min?: url_newMinOrderByAggregateInput
    _sum?: url_newSumOrderByAggregateInput
  }

  export type url_newScalarWhereWithAggregatesInput = {
    AND?: url_newScalarWhereWithAggregatesInput | url_newScalarWhereWithAggregatesInput[]
    OR?: url_newScalarWhereWithAggregatesInput[]
    NOT?: url_newScalarWhereWithAggregatesInput | url_newScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"url_new"> | number
    url?: StringWithAggregatesFilter<"url_new"> | string
    domain?: StringNullableWithAggregatesFilter<"url_new"> | string | null
    discovered_time?: DateTimeNullableWithAggregatesFilter<"url_new"> | Date | string | null
  }

  export type url_indexWhereInput = {
    AND?: url_indexWhereInput | url_indexWhereInput[]
    OR?: url_indexWhereInput[]
    NOT?: url_indexWhereInput | url_indexWhereInput[]
    id?: IntFilter<"url_index"> | number
    url?: StringFilter<"url_index"> | string
    domain?: StringNullableFilter<"url_index"> | string | null
    tld?: StringNullableFilter<"url_index"> | string | null
    markdown_path?: StringNullableFilter<"url_index"> | string | null
    status?: StringNullableFilter<"url_index"> | string | null
    createdAt?: DateTimeNullableFilter<"url_index"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"url_index"> | Date | string | null
    tags?: StringNullableFilter<"url_index"> | string | null
  }

  export type url_indexOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    domain?: SortOrderInput | SortOrder
    tld?: SortOrderInput | SortOrder
    markdown_path?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
  }

  export type url_indexWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    url?: string
    AND?: url_indexWhereInput | url_indexWhereInput[]
    OR?: url_indexWhereInput[]
    NOT?: url_indexWhereInput | url_indexWhereInput[]
    domain?: StringNullableFilter<"url_index"> | string | null
    tld?: StringNullableFilter<"url_index"> | string | null
    markdown_path?: StringNullableFilter<"url_index"> | string | null
    status?: StringNullableFilter<"url_index"> | string | null
    createdAt?: DateTimeNullableFilter<"url_index"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"url_index"> | Date | string | null
    tags?: StringNullableFilter<"url_index"> | string | null
  }, "id" | "url">

  export type url_indexOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    domain?: SortOrderInput | SortOrder
    tld?: SortOrderInput | SortOrder
    markdown_path?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    _count?: url_indexCountOrderByAggregateInput
    _avg?: url_indexAvgOrderByAggregateInput
    _max?: url_indexMaxOrderByAggregateInput
    _min?: url_indexMinOrderByAggregateInput
    _sum?: url_indexSumOrderByAggregateInput
  }

  export type url_indexScalarWhereWithAggregatesInput = {
    AND?: url_indexScalarWhereWithAggregatesInput | url_indexScalarWhereWithAggregatesInput[]
    OR?: url_indexScalarWhereWithAggregatesInput[]
    NOT?: url_indexScalarWhereWithAggregatesInput | url_indexScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"url_index"> | number
    url?: StringWithAggregatesFilter<"url_index"> | string
    domain?: StringNullableWithAggregatesFilter<"url_index"> | string | null
    tld?: StringNullableWithAggregatesFilter<"url_index"> | string | null
    markdown_path?: StringNullableWithAggregatesFilter<"url_index"> | string | null
    status?: StringNullableWithAggregatesFilter<"url_index"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"url_index"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"url_index"> | Date | string | null
    tags?: StringNullableWithAggregatesFilter<"url_index"> | string | null
  }

  export type url_newCreateInput = {
    url: string
    domain?: string | null
    discovered_time?: Date | string | null
  }

  export type url_newUncheckedCreateInput = {
    id?: number
    url: string
    domain?: string | null
    discovered_time?: Date | string | null
  }

  export type url_newUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    discovered_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type url_newUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    discovered_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type url_newCreateManyInput = {
    id?: number
    url: string
    domain?: string | null
    discovered_time?: Date | string | null
  }

  export type url_newUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    discovered_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type url_newUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    discovered_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type url_indexCreateInput = {
    url: string
    domain?: string | null
    tld?: string | null
    markdown_path?: string | null
    status?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    tags?: string | null
  }

  export type url_indexUncheckedCreateInput = {
    id?: number
    url: string
    domain?: string | null
    tld?: string | null
    markdown_path?: string | null
    status?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    tags?: string | null
  }

  export type url_indexUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    tld?: NullableStringFieldUpdateOperationsInput | string | null
    markdown_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type url_indexUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    tld?: NullableStringFieldUpdateOperationsInput | string | null
    markdown_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type url_indexCreateManyInput = {
    id?: number
    url: string
    domain?: string | null
    tld?: string | null
    markdown_path?: string | null
    status?: string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    tags?: string | null
  }

  export type url_indexUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    tld?: NullableStringFieldUpdateOperationsInput | string | null
    markdown_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type url_indexUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    tld?: NullableStringFieldUpdateOperationsInput | string | null
    markdown_path?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type url_newCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    domain?: SortOrder
    discovered_time?: SortOrder
  }

  export type url_newAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type url_newMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    domain?: SortOrder
    discovered_time?: SortOrder
  }

  export type url_newMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    domain?: SortOrder
    discovered_time?: SortOrder
  }

  export type url_newSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type url_indexCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    domain?: SortOrder
    tld?: SortOrder
    markdown_path?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
  }

  export type url_indexAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type url_indexMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    domain?: SortOrder
    tld?: SortOrder
    markdown_path?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
  }

  export type url_indexMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    domain?: SortOrder
    tld?: SortOrder
    markdown_path?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: SortOrder
  }

  export type url_indexSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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