import { getAuthenticationModule } from './typedef';

const { Query } = getAuthenticationModule();

Query.tryLogin(() => true);
