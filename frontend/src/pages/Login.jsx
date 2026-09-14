import { useState } from 'react'
import logoMark from '../assets/logo-mark.png'
import bgImage from '../assets/railway_background.jpg'
import { useTranslation } from '../store/TranslationContext.jsx'

export default function Login({ onLogin }) {
  const { t } = useTranslation()
  const [authMode, setAuthMode] = useState('login') // 'login' | 'register'
  const [step, setStep] = useState('form') // 'form' | 'verification' | 'forgot_password' | 'reset_password'
  
  const [name, setName] = useState('')
  const [role, setRole] = useState('Section Engineer')
  const [department, setDepartment] = useState('ENG')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  
  const division = 'Delhi (DLI)'
  const corridor = 'NDLS-GZB'

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setStep('verification')
  }

  const handleVerifySubmit = (e) => {
    e.preventDefault()
    onLogin({ role, department: role === 'DRM' ? 'ALL' : department, division, corridor })
  }

  const handleForgotSubmit = (e) => {
    e.preventDefault()
    setStep('reset_password')
  }

  const handleResetSubmit = (e) => {
    e.preventDefault()
    setStep('form')
    setAuthMode('login')
  }

  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat font-sans"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Top Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center bg-white p-2 border-4 border-ir-gold rounded-none shadow-[0_0_15px_rgba(255,204,0,0.5)]">
            <img src={logoMark} alt="Logo" width="64" height="64" loading="lazy" className="h-full w-full object-contain" />
          </div>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-widest text-white drop-shadow-md">Niyantran</h1>
          <p className="mt-1 text-sm font-bold uppercase tracking-widest text-ir-gold drop-shadow">{t('landing.subtitle')}</p>
        </div>

        {/* Auth Card */}
        <div className="w-full bg-white dark:bg-slate-900 shadow-2xl border-4 border-ir-maroon rounded-none transition-colors">
          <div className="bg-ir-maroon px-6 py-4 text-center border-b-4 border-ir-gold">
            <h2 className="text-xl font-black uppercase tracking-widest text-white">
              {step === 'form' && authMode === 'login' && t('auth.login_title')}
              {step === 'form' && authMode === 'register' && t('auth.register_title')}
              {step === 'verification' && t('auth.security_verification')}
              {step === 'forgot_password' && t('auth.recover_account')}
              {step === 'reset_password' && t('auth.new_password')}
            </h2>
          </div>

          {step === 'form' && (
            <div>
              <div className="flex border-b-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`w-1/2 py-3 text-sm font-bold uppercase tracking-wider ${authMode === 'login' ? 'bg-white dark:bg-slate-900 border-t-2 border-ir-maroon text-ir-maroon dark:text-ir-gold' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'}`}
                >
                  {t('auth.tab_login')}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`w-1/2 py-3 text-sm font-bold uppercase tracking-wider ${authMode === 'register' ? 'bg-white dark:bg-slate-900 border-t-2 border-ir-maroon text-ir-maroon dark:text-ir-gold' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'}`}
                >
                  {t('auth.tab_register')}
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="px-8 pb-8 pt-6">
                <div className="space-y-4">
                  {authMode === 'register' && (
                    <div>
                      <label htmlFor="regName" className="mb-1 block text-left text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{t('auth.full_name')}</label>
                      <input
                        id="regName"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-ir-maroon dark:focus:border-ir-gold focus:outline-none rounded-none"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="authEmail" className="mb-1 block text-left text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{t('auth.email')}</label>
                    <input
                      id="authEmail"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-ir-maroon dark:focus:border-ir-gold focus:outline-none rounded-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="authPassword" className="mb-1 block text-left text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{t('auth.password')}</label>
                    <input
                      id="authPassword"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-ir-maroon dark:focus:border-ir-gold focus:outline-none rounded-none"
                    />
                  </div>

                  <div className="pt-2">
                    <label htmlFor="authRole" className="mb-1 block text-left text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{t('auth.role')}</label>
                    <select 
                      id="authRole"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-white focus:border-ir-maroon dark:focus:border-ir-gold focus:outline-none rounded-none"
                    >
                      <option>Section Engineer</option>
                      <option>Controller</option>
                      <option>DRM</option>
                    </select>
                  </div>

                  {role !== 'DRM' && (
                    <div className="pt-2">
                      <label htmlFor="authDept" className="mb-1 block text-left text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Department</label>
                      <select 
                        id="authDept"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-white focus:border-ir-maroon dark:focus:border-ir-gold focus:outline-none rounded-none"
                      >
                        <option value="ENG">Engineering (ENG)</option>
                        <option value="SNT">Signal & Telecom (SNT)</option>
                        <option value="TRD">Traction (TRD)</option>
                      </select>
                    </div>
                  )}

                  {authMode === 'login' && (
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" className="h-4 w-4 border-2 border-slate-300 text-ir-maroon rounded-none bg-white dark:bg-slate-800" />
                        <label htmlFor="remember" className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">{t('auth.remember')}</label>
                      </div>
                      <button type="button" onClick={() => setStep('forgot_password')} className="text-xs font-bold uppercase text-ir-maroon dark:text-ir-gold hover:underline">
                        {t('auth.forgot')}
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="focus-ring mt-6 w-full bg-ir-maroon py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-ir-darkmaroon border-2 border-ir-maroon hover:border-ir-gold rounded-none"
                  >
                    {authMode === 'login' ? t('auth.proceed_verification') : t('auth.register_btn')}
                  </button>
                </div>
                
                {authMode === 'login' && (
                  <div className="mt-6 text-center border-t-2 border-slate-200 dark:border-slate-700 pt-4">
                    <button type="button" className="inline-block border-2 border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-none transition-colors">
                      {t('auth.hrms_login')}
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {step === 'verification' && (
            <form onSubmit={handleVerifySubmit} className="px-8 pb-8 pt-6">
              <div className="mb-6 text-center">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {t('auth.otp_sent')} <br/><span className="font-bold text-ir-maroon dark:text-ir-gold">{email || 'your email'}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{t('auth.enter_4_digit')}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="verifyOtp" className="mb-1 block text-center text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{t('auth.4_digit_otp')}</label>
                  <input
                    id="verifyOtp"
                    type="text"
                    placeholder="• • • •"
                    maxLength={4}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-3 text-center text-3xl font-mono tracking-[1em] text-slate-900 dark:text-white focus:border-ir-maroon dark:focus:border-ir-gold focus:outline-none rounded-none"
                  />
                </div>
                <button
                  type="submit"
                  className="focus-ring mt-6 w-full bg-ir-maroon py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-ir-darkmaroon border-2 border-ir-maroon hover:border-ir-gold rounded-none"
                >
                  {authMode === 'login' ? t('auth.verify_login') : t('auth.verify_register')}
                </button>
                <div className="text-center pt-2">
                  <button type="button" onClick={() => {setStep('form'); setOtp('')}} className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">
                    {t('auth.cancel_return')}
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 'forgot_password' && (
            <form onSubmit={handleForgotSubmit} className="px-8 pb-8 pt-6">
              <div className="mb-6 text-center">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Enter your official email address to receive a password reset link.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="forgotEmail" className="mb-1 block text-left text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{t('auth.email')}</label>
                  <input
                    id="forgotEmail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-ir-maroon dark:focus:border-ir-gold focus:outline-none rounded-none"
                  />
                </div>
                <button
                  type="submit"
                  className="focus-ring mt-6 w-full bg-ir-maroon py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-ir-darkmaroon border-2 border-ir-maroon hover:border-ir-gold rounded-none"
                >
                  Send Reset Link
                </button>
                <div className="text-center pt-2">
                  <button type="button" onClick={() => setStep('form')} className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">
                    {t('auth.cancel_return')}
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 'reset_password' && (
            <form onSubmit={handleResetSubmit} className="px-8 pb-8 pt-6">
              <div className="mb-6 text-center">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Verification successful. Please enter your new password.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="resetPass1" className="mb-1 block text-left text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">New Password</label>
                  <input
                    id="resetPass1"
                    type="password"
                    required
                    className="w-full border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-ir-maroon dark:focus:border-ir-gold focus:outline-none rounded-none"
                  />
                </div>
                <div>
                  <label htmlFor="resetPass2" className="mb-1 block text-left text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Confirm Password</label>
                  <input
                    id="resetPass2"
                    type="password"
                    required
                    className="w-full border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-ir-maroon dark:focus:border-ir-gold focus:outline-none rounded-none"
                  />
                </div>
                <button
                  type="submit"
                  className="focus-ring mt-6 w-full bg-ir-maroon py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-ir-darkmaroon border-2 border-ir-maroon hover:border-ir-gold rounded-none"
                >
                  Save New Password
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}
