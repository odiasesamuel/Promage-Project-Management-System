import { cookies } from "next/headers";
import { Lucia, TimeSpan } from "lucia";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import pg from "pg";

// Initialize PostgreSQL client
const pool = new pg.Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
});

const adapter = new NodePostgresAdapter(pool, {
  user: "employee",
  session: "session",
});

const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(8, "h"),
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export const createAuthSession = async (employeeID: string) => {
  const session = await lucia.createSession(employeeID, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
};

export const verifyAuth = async () => {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {}

  return result;
};

export const destroySession = async () => {
  const { session } = await verifyAuth();
  if (!session) {
    return {
      error: "Unauthorized!",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
};

export const deleteExpiredSessions = () => {
  lucia.deleteExpiredSessions();
};

// import { cookies } from "next/headers";
// import { Lucia, TimeSpan } from "lucia";
// import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
// import db from "./db";

// const adapter = new BetterSqlite3Adapter(db, {
//   user: "employee",
//   session: "session",
// });

// const lucia = new Lucia(adapter, {
//   sessionExpiresIn: new TimeSpan(8, "h"),
//   sessionCookie: {
//     expires: false,
//     attributes: {
//       secure: process.env.NODE_ENV === "production",
//     },
//   },
// });

// export const createAuthSession = async (employeeID: string) => {
//   const session = await lucia.createSession(employeeID, {});
//   const sessionCookie = lucia.createSessionCookie(session.id);
//   cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// };

// export const verifyAuth = async () => {
//   const sessionCookie = cookies().get(lucia.sessionCookieName);

//   if (!sessionCookie) {
//     return {
//       user: null,
//       session: null,
//     };
//   }

//   const sessionId = sessionCookie.value;

//   if (!sessionId) {
//     return {
//       user: null,
//       session: null,
//     };
//   }

//   const result = await lucia.validateSession(sessionId);

//   try {
//     if (result.session && result.session.fresh) {
//       const sessionCookie = lucia.createSessionCookie(result.session.id);
//       cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
//     }
//     if (!result.session) {
//       const sessionCookie = lucia.createBlankSessionCookie();
//       cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
//     }
//   } catch {}

//   return result;
// };

// export const destroySession = async () => {
//   const { session } = await verifyAuth();
//   if (!session) {
//     return {
//       error: "Unauthorized!",
//     };
//   }

//   await lucia.invalidateSession(session.id);

//   const sessionCookie = lucia.createBlankSessionCookie();
//   cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// };

// export const deleteExpiredSessions = () => {
//   lucia.deleteExpiredSessions();
// };

