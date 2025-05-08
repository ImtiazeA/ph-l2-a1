# 1. What are some differences between interfaces and types in TypeScript?
# Understanding Interfaces vs. Types in TypeScript

TypeScript offers two powerful ways to define object shapes and custom types in your code: interfaces and types. 

## Basic Syntax: Intefaces vs. Type Aliases

```typescript
// Interface
interface User {
  name: string;
  age: number;
}

// Type
type User = {
  name: string;
  age: number;
};
```

At first glance, they seem to do the exact same thing - both define an object shape with name and age properties. But theres more beneath the surface.

## Key Difference #1: Extendability

Interfaces are designed to be extended, and this is were they truly shine:

```typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

Types can also be extended, but they use a different syntax with intersection types:

```typescript
type Animal = {
  name: string;
}

type Dog = Animal & {
  breed: string;
};
```

## Key Difference #2: Declaration Merging

It is possible to define an interface multiple times, and TypeScript will merge them together, but not possible with type.

```typescript
interface Window {
  title: string;
}

interface Window {
  size: number;
}

// TypeScript merges these to:
// interface Window {
//   title: string;
//   size: number;
// }
```

With type aliases, you cant do this - attempting to redefine a type will result in an error.

## Key Difference #3: Advanced Type Operations

Type aliases can do some things that interfaces simply cant. For instance, you can create union and intersection types directly:

```typescript
type ID = string | number;
type PopularBirds = 'robin' | 'cardinal' | 'bluejay';
type PartialPoint = { x: number } & { y: number };
```

## Key Difference #4: Computed Properties

Type aliases can use computed properties, witch can be extremly useful:

```typescript
type Keys = 'firstName' | 'lastName';

type Person = {
  [key in Keys]: string;
}
// Equivalent to:
// type Person = {
//   firstName: string;
//   lastName: string;
// }
```

Interfaces don't support this kind of mapped type functionality.

# 2. What are some differences between interfaces and types in TypeScript?
# Understanding the use of `keyof` in TypeScript

The `keyof` keyword is what we calls a "type operator" in TypeScript. It's purpose is to extracts the key type from an object type. In simpler terms, `keyof T` gives you a union type of all property names from the type `T`.
This might sounds abstract, so lets dive into an concrete example:
``` typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type UserKeys = keyof User; // equivalent to: "name" | "age" | "email"
```
In this example, `UserKeys` becomes a union type of all the keys in our `User` interface. This is incredibely powerful for ensuring type safety when accessing object properties.

## Practical Applications of `keyof`
### Example 1: Type-Safe Object Access
One of the most common use case for `keyof` is creating functions that accept only valid property names:
``` typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

const userName = getProperty(user, "name"); // Type: string
const userAge = getProperty(user, "age");   // Type: number
const userSalary = getProperty(user, "salary"); // Error: Argument of type '"salary"' is not assignable to parameter of type 'keyof User'.
```
In this example, TypeScript not only prevents us from accessing non-existent properties but also knows the exact type of each property!