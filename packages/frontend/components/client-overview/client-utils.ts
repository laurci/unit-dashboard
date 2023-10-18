export function countMessageTypes(messages: Array<{ direction: 'IN' | 'OUT' }>) {
  let inCount = 0;
  let outCount = 0;

  for (const message of messages) {
    if (message.direction === 'IN') {
      inCount++;
    } else if (message.direction === 'OUT') {
      outCount++;
    }
  }

  return {
    inCount,
    outCount,
  };
}

export function countLogTypes(logs: Array<{ type: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' }>) {
  let infoCount = 0;
  let debugCount = 0;
  let warnCount = 0;
  let errorCount = 0;

  for (const log of logs) {
    if (log.type === 'DEBUG') {
      debugCount++;
    } else if (log.type === 'INFO') {
      infoCount++;
    } else if (log.type === 'WARNING') {
      warnCount++;
    } else if (log.type === 'ERROR') {
      errorCount++;
    }
  }

  return {
    infoCount,
    debugCount,
    warnCount,
    errorCount,
  };
}
