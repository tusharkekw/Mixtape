
/**
 * Simple concurrency control helper.
 * Executes a list of tasks with a maximum concurrency limit.
 * 
 * @param items List of items to process
 * @param concurrency Maximum number of items to process at once
 * @param iterator Function that processes a single item
 */
export async function pMap<T, R>(
    items: T[],
    iterator: (item: T, index: number) => Promise<R>,
    concurrency: number
  ): Promise<R[]> {
    const results: R[] = new Array(items.length);
    const iteratorWithIndex = items.map((item, index) => ({ item, index }));
    const delivering = iteratorWithIndex.splice(0);
    const executing: Set<Promise<void>> = new Set();
    
    async function run(): Promise<void> {
        while (delivering.length > 0) {
            
          // If we reached concurrency limit, wait for one to finish
          if (executing.size >= concurrency) {
            await Promise.race(executing);
          }
    
          const next = delivering.shift();
          if (!next) break; 
    
          const p = Promise.resolve().then(() => iterator(next.item, next.index));
          
          // Wrap promise to remove itself from executing set on completion
          const e = p.then((res) => {
              results[next.index] = res;
              executing.delete(e);
          }, (err) => {
             // If one fails, we can either throw or store undefined/error.
             // For now, let's throw to bubble up, but our logic handles errors inside iterator usually.
             executing.delete(e);
             throw err;
          });
          
          executing.add(e);
        }
        
        await Promise.all(executing);
    }

    await run();
    return results;
  }
