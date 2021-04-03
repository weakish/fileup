<script lang="ts">
  import LC from "leancloud-storage";

  LC.init({
    appId: "your-app-id",
    appKey: "your-app-key",
    serverURL: "https://your-custom-domain.example.com",
  });

  async function uploadFile(toUpload) {
    const uploaded = await toUpload.save();
    const url: string = uploaded.get("url");
    return url;
  }

  let files: FileList;
  $: if (files) {
    for (const file of files) {
      console.log(`${file.name}: ${file.size} bytes`);
    }
  }

  let promise: Promise<string>
  function upload() {
    console.log("debug");
    const firstFile = new LC.File(files[0].name, files[0]);
    console.log(firstFile);
    promise = uploadFile(firstFile);
  }
</script>

<label for="fileUp">You can select multiple files but only one will be uploaded.</label>
<input bind:files id="fileUp" multiple type="file" />
<button on:click={upload}>upload</button>

{#if files}
  <h2>Selected files:</h2>
  {#each Array.from(files) as file}
    <p>{file.name} ({file.size} bytes)</p>
  {/each}
{/if}

{#await promise}
  <p>Uploading...</p>
{:then url}
  <pre><code>{url ?? ""}</code></pre>
{:catch error}
  <p>Error! {error}</p>
{/await}
