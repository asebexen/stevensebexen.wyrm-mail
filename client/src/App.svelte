<script lang="ts">
    import { FirebaseError } from "firebase/app";
  import FirebaseAuth from "./utilities/FirebaseAuth";
  import ViewLogin from './views/Login.svelte';
    import { AuthErrorCodes, type User } from "firebase/auth";

  const auth = FirebaseAuth.Default();
  let user: User | null = null;

  async function onLogin(e: CustomEvent<{email: string, password: string}>): Promise<void> {
    const [email, password] = [e.detail.email, e.detail.password];
    try {
      await auth.login(email, password);
    } catch (e) {
      if (e instanceof FirebaseError) {
        switch(e.code) {
          case AuthErrorCodes.INVALID_EMAIL:
            console.error('Invalid email format');
            break;
          case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
            console.error('Invalid email and/or password');
            break;
          default:
            console.error(e);
        }
      } else {
        console.error(e);
        return;
      }
    }

    user = auth.user;
    console.log('Successful login.');
  }

  async function onSignup(e: CustomEvent<{email: string, password: string}>): Promise<void> {
    const [email, password] = [e.detail.email, e.detail.password];
    try {
      await auth.signup(email, password);
    } catch (e) {
      if (e instanceof FirebaseError) {
        switch (e.code) {
          default:
            console.error(e);
            return;
        }
      } else {
        console.error(e);
        return;
      }
    }

    user = auth.user;
    console.log('Successful creation.');
  }
</script>

<main>
  {#if !user}
    <ViewLogin on:login={onLogin} on:signup={onSignup} />
  {/if}
</main>

<style>

</style>
