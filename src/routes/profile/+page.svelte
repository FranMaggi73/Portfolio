<script lang="ts">
  import { pageTitle } from '../../store/titleStore';
  pageTitle.set('Profile');
  import type { PageData } from './$types';
  export let data: PageData;
  export let profile = data.userProfile;
</script>

<main
  class="flex-1 flex justify-center pb-32 items-center fixed h-dvh sm:pb-16 w-svw overflow-x-auto"
>
  <div class="hero skeleton h-fit w-fit hero-overlay text-center items-center border-20 shadow-lg">
    <div class="hero-content p-0 py-6 sm:py-2 m-3 sm:mx-8 flex-col sm:flex-row">
      <img class="rounded-box sm:mr-3" src={profile?.picture} alt="profile" />
      <div>
        <div class="text-5xl h-fit w-fit outline font-bold rounded-box p-3 m-3 text-primary">
          {profile?.given_name}
          {profile?.family_name}
        </div>
        <p class=" text-2xl font-bold text-success py-3 my-3">{profile?.email}</p>
      </div>
    </div>
  </div>
</main>
