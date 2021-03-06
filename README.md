# KeepText
Convert Google Keep notes to plain text files. Usefull for exporting to other services like SimpleNote.

## Usage

1. Export your Google Keep notes using [Google Takeout](https://takeout.google.com/settings/takeout)
2. Download to Google Keep export
3. Run the script, pointing to where your Google Keep export is located

```bash
# Command
$ node index.js <source> <destination>

# Example
$ node index.js /path/to/keep/export /path/to/output/text
```

