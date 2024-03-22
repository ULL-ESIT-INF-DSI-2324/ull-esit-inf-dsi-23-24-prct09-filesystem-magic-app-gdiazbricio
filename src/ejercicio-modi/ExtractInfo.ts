/**
 * Custom type consisting on the solution tuple.
 */

export type Solution = [(string | undefined)[], (string | undefined)[]];

/**
 * Abstract class representing template class for extracting information about a bagInstance.
 * @param solution_ Consist on the solution of the algorithm.
 */
export abstract class ExtractInfo {
  public solution_: Solution;
  constructor(protected filepath: string) {
    this.solution_ = [[],[]];
  }
  /**
   * Consists on the template method.
   * @returns void.
   */
  public run(): void {
    this.beforeProcessing();
    this.solution_ = this.process(this.filepath);
    this.afterProcessing();
  }

  /**
   * Abstract method that reads and returns a solution.
   */
  protected abstract process(filepath: string): Solution;

  /**
   * Hook methods (non mandatory) to be used before and after processing if needed.
   */
  protected afterProcessing(){}
  protected beforeProcessing(){}
}