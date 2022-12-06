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

export const levelUserHospital = [
  {
    value: "USER_HOSPITAL",
    text: "User"
  },
  {
    value: "ADMIN_HOSPITAL",
    text: "Admin"
  }
]
export const levelUserAdmin = [
  {
    value: "DEV",
    text: "Developer"
  }
]

export const deviceTypes = [
  {
    "value":"CORPORATE",
    "name":"Corporate"
  },
  {
    "value":"CONSUMER",
    "name":"Consumer"
  }
]
export const typeQuestion = [
  {
    text: "Pilihan Ganda",
    type: "radio"
  },
  {
    text: "Kotak Centang",
    type: "checkbox"
  },
  {
    text: "Jawaban Tertulis",
    type: "essay"
  },
  {
    text: "Tanggal",
    type: "date"
  },
  {
    text: "Gambar",
    type: "image"
  }
]

Array.prototype.move = function (from, to) {
  
  this.splice(to, 0, this.splice(from, 1)[0]);
};