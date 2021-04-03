<script lang="ts">
  import Dropzone from "svelte-file-dropzone";
  import LC from "leancloud-storage";

  const appId = "your app id";
  const appKey = "your app key";
  const serverURL = "https://your-custom-domain.example.com";

  LC.init({
    appId,
    appKey,
    serverURL,
  });

  async function uploadFile(toUpload): Promise<String> {
    const uploaded = await new LC.File(toUpload.name, toUpload).save();
    return uploaded.get("url");
  }

  let files: Array<File>
  function handleFilesSelect(e) {
    files = e.detail.acceptedFiles
  }
</script>

<style>
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align:center;
  }
</style>

<Dropzone on:drop={handleFilesSelect} />

{#if files}
  <h2>Files</h2>
  {#each Array.from(files) as file}
    {#await uploadFile(file)}
      <p>Uploading {file.name} ({file.size} bytes) ...</p>
    {:then url}
      <p>Uploaded: <code>{url ?? ""}</code></p>
    {:catch error}
      <pre>{error}</pre>
    {/await}
  {/each}
{/if}

<footer>
  <p>Powered by <a href="https://leancloud.app/">LeanCloud</a> and <a href="https://svelte.dev/">Svelte</a>.</p>
</footer>
