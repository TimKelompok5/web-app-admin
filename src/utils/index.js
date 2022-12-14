export const _ = null

export const useSession = () => {
  function setUser(data) {
    const result = btoa(JSON.stringify(data))
    
    sessionStorage.setItem('dfghcghvmj', result)
  }

  function getUser() {
    const user = sessionStorage.getItem('dfghcghvmj')
    const result = atob(user)
    return user ? JSON.parse(result) : null
  }

  function setToken(token) {
    sessionStorage.setItem('cjlsnd', token)
  }

  function getToken() {
    return sessionStorage.getItem('cjlsnd')
  }

  function signOut() {
    sessionStorage.removeItem('dfghcghvmj')
    sessionStorage.removeItem('cjlsnd')
  }
  return {
    setUser,
    getUser,
    setToken,
    getToken,
    signOut
  }
}

export const parseMessageAuthError=(code)=>{
  if(code == "auth/invalid-email") return "Email tidak valid"
  if(code == "auth/user-not-found") return "Tidak dapat menemukan data user"

  return `Tidak diketahui ${code}`
} 

export const levelUser = [
  {
    value: "USER_HOSPITAL",
    text: "User"
  },
  {
    value: "ADMIN_HOSPITAL",
    text: "Admin"
  }
]


Array.prototype.move = function (from, to) {
  
  this.splice(to, 0, this.splice(from, 1)[0]);
};