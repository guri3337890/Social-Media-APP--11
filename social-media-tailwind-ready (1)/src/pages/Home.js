import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';

function Home() {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);

  const handlePost = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, "posts"), {
      text,
      likes: 0,
      timestamp: new Date()
    });
    setText('');
  };

  const handleClap = async (id, currentLikes) => {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, { likes: currentLikes + 1 });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), snapshot => {
      const postData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      postData.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
      setPosts(postData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">Create a Post</h2>
      <textarea value={text} onChange={e => setText(e.target.value)} className="border w-full p-2 mb-2" rows="3" />
      <button onClick={handlePost} className="bg-blue-500 text-white px-4 py-2 mb-4">Post</button>

      <h2 className="text-lg font-semibold">Feed</h2>
      {posts.map(post => (
        <div key={post.id} className="border p-3 my-2 bg-white rounded shadow">
          <p>{post.text}</p>
          <button onClick={() => handleClap(post.id, post.likes)} className="text-sm mt-1 text-blue-500">
            👏 {post.likes}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;