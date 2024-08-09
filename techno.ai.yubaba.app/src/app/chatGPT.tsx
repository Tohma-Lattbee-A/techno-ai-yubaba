// components/ChatGPT.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatGPT: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isResponseReceived, setIsResponseReceived] = useState<boolean>(false);
    const [isCooldown, setIsCooldown] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isCooldown) {
            alert('クールダウン中です。しばらくお待ちください。');
            return;
        }

        setIsLoading(true);
        setIsResponseReceived(false);

        try {
            const prompt = `「${input}」という人名に対して、それに類似性のあるあだ名をつけ、 次の文章のみを出力してください「贅沢な名だねぇ、今日からお前の名前は「（あだ名）」だよ」（アポストロフィなしで）`;
            const result = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 100,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PROJECT_API_KEY}`,
                    },
                }
            );

            setResponse(result.data.choices[0].message.content.trim());
            setIsResponseReceived(true);
        } catch (error) {
            console.error('Error fetching data from API:', error);
            setResponse('Error fetching data from API');
            setIsResponseReceived(true);
        } finally {
            setIsLoading(false);
            setIsCooldown(true);
            setTimeout(() => setIsCooldown(false), 5000); // 3分のクールダウン180000
        }
    };

    return (
        <div className="rounded-lg gap-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center content-center text-center">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="Ask something..."
                    className="rounded-lg chat-input text-black px-4 py-4"
                    disabled={isLoading || isCooldown}
                />
                <button type="submit" className="submit-button px-2 py-4 bg-white text-black rounded-lg ml-4" disabled={isLoading || isCooldown}>
                    {isLoading ? '送信中...' : '名前を提出する'}
                </button>
            </form>
            {isResponseReceived && (
                <div className="response-container px-10 py-4 bg-white rounded-lg">
                    <p className="response-text text-black">{response}</p>
                </div>
            )}
            {isCooldown && (
                <p className="cooldown-text text-red-500 mt-4">次の送信までお待ちください...</p>
            )}
        </div>
    );
};

export default ChatGPT;
