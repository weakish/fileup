<script lang="ts">
  import CopyToClipboard from "svelte-copy-to-clipboard";
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

  let files: File[]
  let copyStatuses: String[] 
  function handleFilesSelect(e) {
    files = e.detail.acceptedFiles
    copyStatuses = Array(files.length).fill("📋")
  }

  function handleSuccessfulCopy(i) {
    copyStatuses[i] = '✅'
  }
  function handleFailedCopy(i) {
    copyStatuses[i] = '❌'
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

<Dropzone on:drop={handleFilesSelect}>
  Click to select files, or drag and drop some files here.
</Dropzone>

{#if files}
  <h2>Files</h2>
  {#each files as file, i}
    {#await uploadFile(file)}
      <p>Uploading {file.name} ({file.size} bytes) ...</p>
    {:then url}
      <p>Uploaded:
        <code>{url ?? ""}</code>
        <CopyToClipboard text={url} on:copy={() => handleSuccessfulCopy(i)} on:fail={() => handleFailedCopy(i)} let:copy>
          <button on:click={copy}>{copyStatuses[i]}</button>
        </CopyToClipboard>
      </p>
    {:catch error}
      <pre>{error}</pre>
    {/await}
  {/each}
{/if}

<footer>
  <p>Powered by <a href="https://leancloud.app/">LeanCloud</a> and <a href="https://svelte.dev/">Svelte</a>.</p>
</footer>
