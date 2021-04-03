<script lang="ts">
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

  let files: FileList;
  $: if (files) {
    for (const file of files) {
      console.log(`${file.name}: ${file.size} bytes`);
    }
  }
</script>

<label for="fileUp">You can select and upload multiple files.</label>
<input bind:files id="fileUp" multiple type="file" />

{#if files}
  <h2>Selected and to upload files:</h2>
  {#each Array.from(files) as file}
    {#await uploadFile(file)}
      <p>Uploading {file.name} ({file.size} bytes) ...</p>
    {:then url}
      <p>Uploaded: <code>{url ?? ""}</code></p>
    {:catch error}
      <p>Error! {error}</p>
    {/await}
  {/each}
{/if}
