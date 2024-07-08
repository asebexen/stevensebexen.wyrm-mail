<script lang="ts">
  import { FirebaseError } from "firebase/app";
  import FirebaseAuth from "./utilities/FirebaseAuth";
  import ViewLogin from './views/Login.svelte';
  import ViewDashboard from './views/Dashboard.svelte';
  import { AuthErrorCodes, type User } from "firebase/auth";
    import createUser from "./api/createUser";

  const auth = FirebaseAuth.Default();

  enum AppView {Dashboard, ManageLists, Email}

  let user: User | null = null;
  let view: AppView = AppView.Dashboard;

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

    // Firebase user creation.
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

    // Server user creation.
    await createUser(email);

    user = auth.user;
    console.log('Successful creation.');
  }
</script>

<main>
  {#if !user}
    <ViewLogin on:login={onLogin} on:signup={onSignup} />
  {:else if view === AppView.Dashboard}
    <ViewDashboard />
  {/if}
</main>