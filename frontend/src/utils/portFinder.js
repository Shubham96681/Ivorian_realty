/**
 * Find a free port starting from a given port number
 * @param {number} startPort - The port number to start searching from
 * @param {number} maxAttempts - Maximum number of ports to try (default: 100)
 * @returns {Promise<number>} - The first available port found
 */
export async function findFreePort(startPort = 3000, maxAttempts = 100) {
  return new Promise((resolve, reject) => {
    let currentPort = startPort;
    let attempts = 0;

    const tryPort = (port) => {
      // Create a temporary server to test if port is available
      const net = require('net');
      const server = net.createServer();
      
      server.listen(port, () => {
        server.once('close', () => {
          resolve(port);
        });
        server.close();
      });

      server.on('error', () => {
        attempts++;
        if (attempts >= maxAttempts) {
          reject(new Error(`Could not find a free port after ${maxAttempts} attempts`));
          return;
        }
        currentPort++;
        tryPort(currentPort);
      });
    };

    tryPort(currentPort);
  });
}

/**
 * Check if a specific port is available
 * @param {number} port - Port number to check
 * @returns {Promise<boolean>} - True if port is available, false otherwise
 */
export async function isPortAvailable(port) {
  return new Promise((resolve) => {
    const net = require('net');
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });

    server.on('error', () => {
      resolve(false);
    });
  });
}




