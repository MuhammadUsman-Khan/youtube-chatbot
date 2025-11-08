# YouTube Chatbot

An intelligent, fully dynamic Retrieval-Augmented Generation (RAG) chatbot that answers questions about any YouTube video you provide.  
It uses **OpenAI Whisper** for transcription, **OpenAI embeddings (small)** for semantic search, and **Gemini** for generating responses, all via API keys. No local models are required.

---

## 🚀 Key Features
- **Dynamic YouTube Video Learning**: Enter any video URL and the bot automatically processes it.  
- **Audio Conversion & Transcription**: Video is converted to audio, then transcribed using **OpenAI Whisper**.  
- **JSON Storage**: Transcriptions are stored in JSON format for structured processing.  
- **OpenAI Embeddings**: Transcript chunks are converted into embeddings for semantic retrieval.  
- **User Query Matching**: Queries are converted into embeddings and matched using cosine similarity.  
- **Gemini API Responses**: Generates context-aware answers based on the relevant transcript; replies with "Information not available in the provided video" if no match exists.  
- **Flask Web Interface**: Interactive and user-friendly chat interface.

---

## 🛠️ Tech Stack
- **Python 3**
- **Flask** for web backend
- **HTML/CSS/JS** for frontend templates
- **OpenAI Whisper API** for transcription
- **OpenAI Embeddings (small)** for vectorization
- **Gemini API** for LLM responses
- **Cosine Similarity** for Nearest neighbor search

---

## 📁 Project Structure

```
youtube-chatbot/
├── app.py 
├── backend/
│ ├── embeddings.py 
│ ├── mp3_to_json.py 
│ ├── process_incomings.py
│ └── yt_to_mp3.py 
├── templates/ 
│ └── index.html 
├── static/ 
│ ├── style.css 
│ └── script.js 
├── requirements.txt 
└── README.md
```


---

## 🧭 How It Works
1. User provides a **YouTube URL**.  
2. Video is converted to **audio** using `yt_to_mp3.py`.  
3. Audio is transcribed via **OpenAI Whisper** using `mp3_to_json.py` and stored as JSON.  
4. Transcript chunks are converted into embeddings with `embeddings.py` using OpenAI Embeddings (small).  
5. User query is also converted into embeddings.  
6. **Cosine similarity** is computed between query and transcript embeddings via `process_incomings.py`.  
7. The most relevant transcript chunk is sent to **Gemini API** for a response.  
8. If no relevant information exists, the bot replies:  
   > "Information not available in the provided video."  
9. Response is displayed in the Flask web UI (`index.html`).

---

## 📌 Setup Instructions
1. Clone the repository:
```
git clone https://github.com/MuhammadUsman-Khan/youtube-chatbot.git
cd youtube-chatbot
```
2. Install dependencies:
```
pip install -r requirements.txt

```

3. Set environment variables for API keys:
```
export OPENAI_API_KEY="your_openai_key"
export GEMINI_API_KEY="your_gemini_key"

```

4. Run the Flask app:
```
python app.py

```

5. Open your browser at http://127.0.0.1:5000/ and start chatting with the bot.

---

## 📌 requirements.txt

```
Flask==3.1.2
imageio_ffmpeg==0.6.0
joblib==1.5.0
numpy==2.3.4
openai==2.7.1
openai_whisper==20250625
pandas==2.3.3
python-dotenv==1.2.1
Requests==2.32.5
scikit_learn==1.7.2
```

## ✅ Notes & Improvements

- Fully dynamic; no local models required.

- Transcript quality depends on YouTube captions and audio clarity.

- Reduce Time Complexity and make it faster.

- Frontend can be enhanced with chat history, typing indicators, and UI themes.

## 🤝 Contributing

Feel free to fork the repo, submit issues, or create pull requests. Contributions are welcome!

## 🖊️ Author & Developer

#### Muhammad Usman Khan
