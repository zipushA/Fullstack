IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [MatchingData] (
    [Id] int NOT NULL IDENTITY,
    [Seniority] int NOT NULL,
    [IsBoys] bit NOT NULL,
    [IsKeruv] bit NOT NULL,
    [ResidentialArea] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_MatchingData] PRIMARY KEY ([Id])
);

CREATE TABLE [Permission] (
    [Id] int NOT NULL IDENTITY,
    [PermissionName] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Permission] PRIMARY KEY ([Id])
);

CREATE TABLE [Roles] (
    [Id] int NOT NULL IDENTITY,
    [RoleName] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Roles] PRIMARY KEY ([Id])
);

CREATE TABLE [Users] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    [SchoolName] nvarchar(max) NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [Password] nvarchar(max) NOT NULL,
    [Link] nvarchar(max) NOT NULL,
    [MatchingDataId] int NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Users_MatchingData_MatchingDataId] FOREIGN KEY ([MatchingDataId]) REFERENCES [MatchingData] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [PermissionRole] (
    [PermissionListId] int NOT NULL,
    [PermissionListId1] int NOT NULL,
    CONSTRAINT [PK_PermissionRole] PRIMARY KEY ([PermissionListId], [PermissionListId1]),
    CONSTRAINT [FK_PermissionRole_Permission_PermissionListId1] FOREIGN KEY ([PermissionListId1]) REFERENCES [Permission] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PermissionRole_Roles_PermissionListId] FOREIGN KEY ([PermissionListId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [RoleUser] (
    [RoleListId] int NOT NULL,
    [UserListId] int NOT NULL,
    CONSTRAINT [PK_RoleUser] PRIMARY KEY ([RoleListId], [UserListId]),
    CONSTRAINT [FK_RoleUser_Roles_RoleListId] FOREIGN KEY ([RoleListId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_RoleUser_Users_UserListId] FOREIGN KEY ([UserListId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);

CREATE INDEX [IX_PermissionRole_PermissionListId1] ON [PermissionRole] ([PermissionListId1]);

CREATE INDEX [IX_RoleUser_UserListId] ON [RoleUser] ([UserListId]);

CREATE INDEX [IX_Users_MatchingDataId] ON [Users] ([MatchingDataId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250529194346_InitialCloud', N'9.0.2');

COMMIT;
GO

