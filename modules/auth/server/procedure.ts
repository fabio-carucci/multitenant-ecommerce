import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { z } from "zod";
import { AUTH_COOKIE } from "../constants";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.payload.auth({ headers });

    return session;
  }),
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();

    cookies.delete(AUTH_COOKIE);
  }),
  register: baseProcedure
    .input(
      z.object({
        email: z.email(),
        password: z.string().min(8),
        username: z
          .string()
          .min(3, "Username must be at least 3 characters long")
          .max(63, "Username must be at most 63 characters long")
          .regex(
            /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
            "username can only contain lowercase letters, numbers, and hyphens. It must start and end with a letter or number."
          )
          .refine(
            (val) => !val.includes("--"),
            "username cannot contain consecutive hyphens."
          )
          .transform((val) => val.toLowerCase()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.payload.create({
        collection: "users",
        data: {
          email: input.email,
          password: input.password, // This will be hashed
          username: input.username,
        },
      });

      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      const cookies = await getCookies();

      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // TODO: ensure cross-domain cookie sharing
        // sameSite: "none",
        // domain: ""
      });
    }),
  login: baseProcedure
    .input(
      z.object({
        email: z.email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      const cookies = await getCookies();

      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // TODO: ensure cross-domain cookie sharing
        // sameSite: "none",
        // domain: ""
      });

      return data;
    }),
});
