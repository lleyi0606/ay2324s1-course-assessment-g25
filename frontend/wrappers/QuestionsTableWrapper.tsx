'use client'

import { GET } from '../app/api/v1/questions/route'
import { NextRequest } from "next/server";
import { useEffect, useState } from 'react'

interface Question {
    title: string;
    complexity: string;
    category: string;
}

export default function QuestionsTableWrapper() {

    const [questions, setQuestions] = useState<Question[]>([]);

    const BASE_URL = process.env.BASE_URL || 'http://localhost:8080'

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await GET(new NextRequest(BASE_URL + '/api/v1/questions?page=1&limit=10', { method: 'GET' }));
            const data = await response.json();
            setQuestions(data); 
          } catch (error: any) {
            console.error('Error fetching data:', error.message);
          }
        };
    
        fetchData();
      }, []);

    const handleDelete = (index: any) => {
        /* const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
        localStorage.setItem("questions", JSON.stringify(updatedQuestions)); */
    };

    const handleQuestionClick = (question: any) => {
        /* setSelectedQuestion(question); */
    };

    return (
        <div className="table-container">
        <table className="min-w-full">
          <caption className="text-lg font-semibold mb-2">Questions</caption>
          <thead>
            <tr className="border-b bg-white">
              <th className="py-2 text-left font-medium pl-1">ID</th>
              <th className="py-2 text-left font-medium">Title</th>
              <th className="py-2 text-left font-medium">Complexity</th>
              <th className="py-2 text-left font-medium">Category</th>
              <th className="py-2 text-left font-medium">Delete</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr
                key={index}
                onClick={() => handleQuestionClick(question)}
                className={index % 2 === 1 ? 'bg-theme bg-opacity-20' : 'bg-white'}
              >
                <td className="py-1 pl-1">{index + 1}</td>
                <td className="py-1 ">{question.title || ''}</td>
                <td className="py-1 ">{question.complexity || ''}</td>
                <td className="py-1 ">{question.category || ''}</td>
                <td className="py-1">
                  <button
                    className="delete-button bg-red-500 text-white px-3 py-1 rounded font-medium"
                    data-index={index}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}