import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from "../config";
import { ContentItem } from "../types/types";
import Card from '../components/Card';
import Button from "../components/Button";
import {LockIcon}  from '../icons/LockIcon';
import { ErrorComponent } from '../components/ErrorComponent';

export function AnotherUserBrain() {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [brainData, setBrainData] = useState<Array<ContentItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [accessible, setAccessible] = useState<boolean>(true);

  useEffect(() => {
    const fetchBrainData = async () => {
      try {
        setLoading(true);
        console.log(`${BACKEND_URL}/api/v1/brain/${shareId}`);
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/brain/${shareId}`,
          {
            withCredentials: true
          }
        );
        setUsername(response.data.username || 'User');
        setBrainData(response.data?.content);
      } catch (err: any) {
        if(err.status === 403){
          console.log(err);
          setAccessible(false);
        }
        else if(err.status === 404){
          setError('User Brain Not Found')
        }
      } finally {
        setLoading(false);
      }
    };

    if (shareId) {
      fetchBrainData();
    }
    console.log(shareId);
    
  }, [shareId]);

  const handleGoBack = () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-300"></div>
          </div>
          <span className="text-gray-700 text-lg font-medium">Loading Brain...</span>
        </div>
      </div>
    );
  }

  if(! accessible){
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-screen">
        <div className="bg-red-50 rounded-full p-4 mb-4">
          <LockIcon />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h2>
        
        <p className="text-gray-700/80 mb-6 max-w-md">
          You don't have permission to view this user's Brain. This content may be private or the share link might have expired.
        </p>
        
        <div className="space-y-4">
          <Button text='Return to Your Brain' variant='primary' onClick={()=>navigate('/dashboard')}/>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorComponent errorMessage={error} />;
  }

  if (!brainData || brainData.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="p-8 text-center sm:shadow-lg sm:bg-white rounded-2xl">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Content Found</h2>
          <p className="text-gray-600 mb-6">This user hasn't saved any content to their brain yet.</p>
          <div className='flex justify-center items-center'>
            <Button text='Return to Your Brain' variant='primary' onClick={handleGoBack} />
          </div>
        </div>
      </div>
    );
  }
  console.log(brainData);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-6 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        <div className="relative">
          <div className="flex items-center justify-center mb-12">
            <div className="bg-white rounded-full py-1 px-8 inline-flex items-center">
              <svg className="w-7 h-7 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
              <h1 className="text-xl sm:text-3xl font-bold">
                <span className="text-gray-700">Exploring</span>
                <span className="text-blue-600 ml-2">{username}'s</span>
                <span className="text-gray-700 ml-2">Brain</span>
              </h1>
            </div>
          </div>

          <div className="sm:hidden overflow-x-hidden">
            <div className="flex justify-between items-center px-5 py-2">
              <h2 className="text-blue-600 font-medium">Thoughts</h2>
              <div className="text-blue-600 text-sm">{brainData.length} items</div>
            </div>

            <div className="flex flex-wrap gap-4 p-4 justify-center">
              {brainData?.map((note) => (
                <div key={note._id}>
                  <Card
                    link={note.link}
                    type={note.type}
                    title={note.title}
                  />
                </div>
              ))}
            </div>
          </div>

          
          <div className="hidden sm:block bg-white border-2 border-blue-600 rounded-3xl overflow-hidden">
            <div className="bg-blue-600 py-2 px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-medium">Collected Thoughts & Resources</h2>
                <div className="text-blue-100 text-sm">{brainData.length} items</div>
              </div>
            </div>

            <div className="h-[40rem] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
              <div className="flex flex-wrap gap-6 p-6 justify-center">
                {brainData?.map((note: ContentItem) => (
                  <div key={note._id}>
                    <Card
                      link={note.link}
                      type={note.type}
                      title={note.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              text='Return to Your Brain'
              variant='primary'
              onClick={handleGoBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
}