import os
import subprocess
import imageio_ffmpeg

def link_to_mp3(downloads):
    """
    Downloads YouTube videos or entire playlists as MP3 files using yt-dlp.
    Each (url, name) pair in 'downloads' can be a single video or playlist.
    Returns a list of all downloaded MP3 file paths.
    """
    os.makedirs("audios", exist_ok=True)
    results = []
    ffmpeg_path = imageio_ffmpeg.get_ffmpeg_exe()

    print("🎧 Downloads received:", downloads)

    for url, name in downloads:
        print(f"\n🔍 Processing: {url}")

        # Detect if the link is a playlist
        is_playlist = "playlist" in url or "list=" in url

        # yt-dlp command options
        command = [
            "yt-dlp",
            "-x",                        # Extract audio only
            "--audio-format", "mp3",     # Convert to MP3
            "--ffmpeg-location", ffmpeg_path,
            "-o", f"audios/{name}_%(title)s.%(ext)s",  # Save each file with title
        ]

        # If playlist, download all videos
        if is_playlist:
            command += ["--yes-playlist"]
            print("📜 Detected playlist — downloading all videos...")
        else:
            command += ["--no-playlist"]
            print("🎬 Detected single video — downloading only one...")

        # Append the URL at the end
        command.append(url)

        try:
            # Run the yt-dlp command
            subprocess.run(command, check=True)

            # Collect all .mp3 files generated with the given name prefix
            for file in os.listdir("audios"):
                if file.startswith(name) and file.endswith(".mp3"):
                    file_path = os.path.join("audios", file)
                    results.append(file_path)
                    print(f"✅ Downloaded: {file_path}")

        except subprocess.CalledProcessError as e:
            print(f"❌ Error downloading: {url}")
            print("   Details:", e)

    print(f"\n🎉 Total MP3 files downloaded: {len(results)}")
    return results


if __name__ == "__main__":
    downloads = []
    link_to_mp3(downloads)
