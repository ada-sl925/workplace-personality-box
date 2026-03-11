import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import questions from '../questions.json';
import { recommendPosition } from '../results';
import type { Question, UserAnswer } from './types';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const currentQuestion = questions[currentQuestionIndex] as Question;
  const totalQuestions = questions.length;

  // 处理选项选择
  const handleOptionSelect = (optionId: string, optionType: string) => {
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      optionId,
      optionType
    };

    const newAnswers = [...userAnswers, newAnswer];
    setUserAnswers(newAnswers);

    // 如果是最后一题，显示结果
    if (currentQuestionIndex === totalQuestions - 1) {
      setTimeout(() => setShowResult(true), 500);
    } else {
      // 下一题
      setDirection('left');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  // 回到上一题
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection('right');
      // 移除最后一条答案记录
      const newAnswers = [...userAnswers];
      newAnswers.pop();
      setUserAnswers(newAnswers);

      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
      }, 300);
    }
  };

  // 重新开始
  const handleRestart = () => {
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setDirection('left');
  };

  // 获取推荐结果
  const getResult = () => {
    const selectedTypes = userAnswers.map(answer => answer.optionType);
    return recommendPosition(selectedTypes);
  };

  // 计算进度
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // 动画变体
  const cardVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    })
  };

  // 结果页动画
  const resultVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <div className="max-w-md mx-auto">
        {/* 顶部标题和进度条 */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            职场性格盲盒
          </h1>
          <p className="text-gray-400 text-center text-sm mb-4">
            回答10道题，解锁你的专属岗位推荐
          </p>

          {/* 进度条 */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
            <motion.div
              className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>问题 {currentQuestionIndex + 1} / {totalQuestions}</span>
            <span>{Math.round(progress)}% 完成</span>
          </div>
        </header>

        <main className="relative min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            {!showResult ? (
              <motion.div
                key={currentQuestionIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                {/* 问题卡片 */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                  {/* 问题编号 */}
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                      {currentQuestion.id}
                    </div>
                    <div className="ml-3 text-sm text-gray-400">
                      职场情景题
                    </div>
                  </div>

                  {/* 问题文本 */}
                  <h2 className="text-xl font-medium mb-6 leading-relaxed">
                    {currentQuestion.question}
                  </h2>

                  {/* 选项列表 */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionSelect(option.id, option.type)}
                        className="w-full text-left p-4 rounded-xl bg-gray-900/70 border border-gray-700 hover:border-cyan-500/50 transition-colors group"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold mr-3 group-hover:bg-gradient-to-r from-cyan-500 to-purple-600 transition-colors">
                            {option.id}
                          </div>
                          <span className="text-gray-200 group-hover:text-white transition-colors">
                            {option.text}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* 上一题按钮 */}
                  {currentQuestionIndex > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-700/50">
                      <button
                        onClick={handlePrevious}
                        className="text-gray-400 hover:text-cyan-400 text-sm flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        返回上一题
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                variants={resultVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-0"
              >
                {/* 结果卡片 */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                  {/* 结果图标 */}
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-3xl mb-4">
                      {getResult().emoji}
                    </div>
                    <div className="text-sm text-cyan-400 font-medium mb-1">
                      盲盒已开启
                    </div>
                    <h2 className="text-2xl font-bold mb-2">你的职场人格报告</h2>
                  </div>

                  {/* 推荐岗位 */}
                  <div className="mb-8">
                    <div className="text-gray-400 text-sm mb-2">推荐岗位</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      {getResult().title}
                    </div>
                  </div>

                  {/* 毒舌评价 */}
                  <div className="mb-8">
                    <div className="text-gray-400 text-sm mb-2">AI 评价</div>
                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                      <div className="flex">
                        <div className="text-cyan-400 mr-2">💬</div>
                        <p className="text-gray-300 leading-relaxed italic">
                          "{getResult().description}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 重新开始按钮 */}
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleRestart}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-700 text-white font-medium text-lg"
                    >
                      再测一次
                    </motion.button>

                    {/* 分享按钮 */}
                    <button className="w-full py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-300 font-medium">
                      分享结果
                    </button>
                  </div>

                  {/* 底部提示 */}
                  <div className="mt-8 pt-6 border-t border-gray-700/50 text-center text-sm text-gray-500">
                    <p>仅供参考，职业选择还需结合实际情况</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* 底部信息 */}
        <footer className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 职场性格盲盒 • 仅供娱乐</p>
        </footer>
      </div>
    </div>
  );
}

export default App;