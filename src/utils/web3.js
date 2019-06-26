export const getWeb3 = () => {
  if (process.browser) {
    if (window.ethereum) {
      return new Web3(window.ethereum)
    }
    if (window.web3) {
      return new Web3(window.web3.currentProvider)
    }
  }
  return false
}

export const detectMetamask = () => {
  if (process.browser) {
    if (window.ethereum) {
      return window.ethereum.isMetaMask
    }
    if (window.web3) {
      return window.web3.currentProvider.isMetaMask
    }
  }

  return !process.browser
}

export const getAccount = () => {
  if (window.ethereum) {
    return window.ethereum.enable().then(accounts => accounts && accounts[0])
  }
  if (window.web3) {
    const localWeb3 = getWeb3()
    return new Promise((resolve, reject) => {
      resolve(localWeb3.eth.accounts[0])
    })
  }
  return Promise.resolve()
}

export const signMessage = account => {
  const message = `Login into Santiment with address ${account}`
  const localWeb3 = getWeb3()
  const messageHash = localWeb3.sha3(
    '\x19Ethereum Signed Message:\n' + message.length + message,
  )
  return new Promise((resolve, reject) => {
    localWeb3.personal.sign(
      localWeb3.fromUtf8(message),
      account,
      (error, signature) => {
        if (error) {
          reject(error)
        }

        resolve({
          messageHash,
          signature,
        })
      },
    )
  })
}
