import styles from "./Welcome.module.css";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link"


export function Welcome() {
  return (
    <section className={styles.welcome}>
      <p>Welcome to the todo example app</p>
      <p>This is featuring Xata, Clerk, Next.js and trpc</p>
      <div>
     <Link href="/signin">Sign In</Link>
      </div>
    </section>
  );
}
