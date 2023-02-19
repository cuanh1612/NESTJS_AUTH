import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('message-queue')
export class MessageConsumer {
  @Process('message-job')
  readOperationJob(job: Job<unknown> & { data: { Text: string } }) {
    return job.data.Text;
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data.Text} ...`,
    );
  }
}
