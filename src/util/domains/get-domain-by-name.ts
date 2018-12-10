import chalk from 'chalk';
import Client from '../client';
import wait from '../output/wait';
import { Domain, DomainExtra } from '../../types';
import { DomainPermissionDenied, DomainNotFound } from '../errors-ts';

async function getDomainByName(client: Client, contextName: string, domainName: string) {
  const cancelWait = wait(`Fetching domains ${domainName} under ${chalk.bold(contextName)}`);
  try {
    const payload = await client.fetch<Domain & DomainExtra>(`/v4/domains/${domainName}`);
    cancelWait();
    return payload;
  } catch (error) {
    cancelWait();
    if (error.status === 404) {
      return new DomainNotFound(domainName);
    }

    if (error.status === 403) {
      return new DomainPermissionDenied(domainName, contextName);
    }

    throw error;
  }
}

export default getDomainByName;