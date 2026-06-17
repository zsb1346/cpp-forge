/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 编辑感衬线（标题）—— 中文回退到思源宋体
        display: ['Numbers', 'Fraunces', '"Noto Serif SC"', 'Georgia', 'serif'],
        // 正文无衬线 —— 中文回退到思源黑体
        sans: ['Numbers', '"Hanken Grotesk"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        // 代码
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // ===== Forge 暖调纸感主题 =====
        paper: {
          DEFAULT: '#f7f3ec', // 主背景：温暖米白
          raised: '#fffdf8',  // 卡片：略亮的纸
          sunk:  '#efe9df',   // 凹陷区/轨道
          line:  '#e3dccf',   // 分隔线
        },
        ink: {
          DEFAULT: '#26211c', // 主文字：暖墨黑
          soft:    '#5b5249', // 次要文字
          faint:   '#938778', // 弱文字
          ghost:   '#bdb3a4', // 占位/禁用
        },
        // 单一主强调色：炭橙（锻造之火）
        ember: {
          DEFAULT: '#d9480f',
          soft:    '#e8590c',
          tint:    '#fbe9df', // 淡背景
          deep:    '#a93508',
        },
        // 辅助语义色（克制使用）
        sage:  { DEFAULT: '#4d7c4f', tint: '#e6efe4' }, // 正确/绿
        clay:  { DEFAULT: '#b03a2e', tint: '#f7e3df' }, // 错误/红
        gold:  { DEFAULT: '#b7791f', tint: '#f6ecd6' }, // 星/高亮
        // ===== 代码"宝石岛"深色区 =====
        slate: {
          DEFAULT: '#211d2b', // 代码块底
          raised:  '#2b2636',
          line:    '#3a3347',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'paper':  '0 1px 2px rgba(38,33,28,0.04), 0 8px 24px -12px rgba(38,33,28,0.12)',
        'lift':   '0 2px 4px rgba(38,33,28,0.05), 0 18px 40px -20px rgba(38,33,28,0.22)',
        'ember':  '0 8px 28px -10px rgba(217,72,15,0.45)',
        'inset':  'inset 0 1px 2px rgba(38,33,28,0.06)',
        'gem':    '0 24px 60px -28px rgba(33,29,43,0.7)',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'rise':       'rise 0.55s cubic-bezier(0.22,1,0.36,1) forwards',
        'pop':        'pop 0.32s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'slide-in':   'slideIn 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'shake':      'shake 0.4s ease-in-out',
        'spark':      'spark 0.6s ease-out forwards',
        'underline':  'underline 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
        'float':      'float 6s ease-in-out infinite',
        // animated-timeline 专用动画
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
        'glow':       'glow 2s ease-in-out infinite',
        'arrow-flow': 'arrowFlow 0.8s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%,60%': { transform: 'translateX(-6px)' },
          '40%,80%': { transform: 'translateX(6px)' },
        },
        spark: {
          '0%': { opacity: '0', transform: 'scale(0.4) rotate(-12deg)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'scale(1.4) rotate(8deg)' },
        },
        underline: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseRing: {
          '0%,100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
        glow: {
          '0%,100%': { boxShadow: '0 0 6px 1px rgba(210,120,70,0.15)' },
          '50%': { boxShadow: '0 0 14px 4px rgba(210,120,70,0.3)' },
        },
        arrowFlow: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-14' },
        },
      },
    },
  },
  plugins: [],
}
