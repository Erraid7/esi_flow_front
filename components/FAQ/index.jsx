import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { ArrowDown2, ArrowRight2 } from 'iconsax-react';

export default function ESIFlowFAQs() {
  const [openQuestion, setOpenQuestion] = useState('what');
  const [heights, setHeights] = useState({});
  const answerRefs = useRef({});

  const faqs = [
    {
      id: 'what',
      question: 'What is ESI Flow?',
      answer: 'ESI Flow is a platform that allows students and staff to report, track, and stay updated on technical issues within ESI.'
    },
    {
      id: 'who',
      question: 'Who can use ESI Flow?',
      answer: 'ESI Flow is available to all students and staff members with a valid institutional login. Faculty, administrators, and IT personnel have different permission levels within the system.'
    },
    {
      id: 'how',
      question: 'How do I report a technical problem?',
      answer: 'You can report a technical problem by logging into ESI Flow, clicking on "New Report" button, filling out the required form with details about your issue, and submitting it. You\'ll receive a confirmation email with a tracking number.'
    },
    {
      id: 'track',
      question: 'Can I track the status of my report?',
      answer: 'Yes, you can track the status of your report by logging into ESI Flow and navigating to "My Reports" section. You can also receive email notifications when there are updates to your reported issues.'
    }
  ];

  // Measure heights of answer divs after initial render
  useEffect(() => {
    const newHeights = {};
    Object.keys(answerRefs.current).forEach(id => {
      if (answerRefs.current[id]) {
        newHeights[id] = answerRefs.current[id].scrollHeight;
      }
    });
    setHeights(newHeights);
  }, []);

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className=" bg-[#F5F7F8] py-8 px-20">
      <Head>
        <title>ESI Flow FAQs</title>
        <meta name="description" content="Frequently asked questions about ESI Flow" />
      </Head>

      <div className="mx-auto rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-8xl font-bold text-gray-800 mb-8">
            Discover ESI<br />
            Flow FAQs
          </h1>

          <div className="space-y-2">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 bg-white hover:bg-gray-50 transition-colors rounded-md overflow-hidden">
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full px-4 py-5 text-left flex justify-between items-center"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className="text-gray-500 transition-transform duration-300">
                    {openQuestion === faq.id ? (
                      <ArrowDown2 size="16" color="#254E7A" />
                    ) : (
                      <ArrowRight2 size="16" color="#254E7A" />
                    )}
                  </span>
                </button>
                <div 
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ 
                    maxHeight: openQuestion === faq.id ? `${heights[faq.id] || 1000}px` : '0',
                    opacity: openQuestion === faq.id ? 1 : 0
                  }}
                >
                  <div 
                    ref={el => answerRefs.current[faq.id] = el}
                    className="px-4 pb-5"
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}