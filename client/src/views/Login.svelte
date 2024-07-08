<script lang='ts'>
    import { createEventDispatcher } from "svelte";

  let inputEmail = '';
  let inputPassword = '';

  let selectedAction: 'login' | 'signup' = 'login';

  const dispatch = createEventDispatcher<{
    login: {email: string, password: string},
    signup: {email: string, password: string}
  }>();

  function submit() {
    dispatch(selectedAction, {email: inputEmail, password: inputPassword});
  }
</script>

<button class={selectedAction === 'login' ? 'active' : ''} on:click={() => selectedAction = 'login'}>Log in</button>
<button class={selectedAction === 'signup' ? 'active' : ''} on:click={() => selectedAction = 'signup'}>Sign up</button>
<div class='login-form'>
  <div class='login-form-row'>
    <label for="input-email">Email</label>
    <input id="input-email" bind:value={inputEmail} placeholder="Email Address" />
  </div>
  <div class='login-form-row'>
    <label for="input-password">Password</label>
    <input id="input-password" bind:value={inputPassword} placeholder="Password" type="password" />
  </div>
  <button on:click={submit}>{selectedAction === 'login' ? 'Log in' : 'Sign up'}</button>
</div>

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .active {
    background-color: #ed5f5f;
  }
</style>