# keeptext
Convert Google Keep notes to plain text files. This is useful for exporting to other services like SimpleNote.

## Usage

1. Export your Google Keep notes using [Google Takeout](https://takeout.google.com/settings/takeout). Deselect other services that are not Keep to make the download faster.
2. Download your Google Keep export
3. Run the script, pointing to where your Google Keep export is located

```bash
# Command
$ node index.js <source> <destination>

# Example
$ node index.js /path/to/keep/export /path/to/output/text
```

