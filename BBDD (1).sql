-- =============================================================================
-- TOKENTICK - Sistema de Ticketing para Departamentos IT (Versión 1.1.0)
-- =============================================================================

DROP DATABASE IF EXISTS tokentick;
CREATE DATABASE IF NOT EXISTS tokentick
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tokentick;

-- =============================================================================
-- TABLA: users
-- Actualizada con los roles: user, helpdesk, tic, admin
-- =============================================================================
CREATE TABLE users (
  id            INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  name          VARCHAR(100)    NOT NULL,
  email         VARCHAR(150)    NOT NULL,
  password_hash VARCHAR(255)    NOT NULL,
  role          ENUM(
                  'user',        -- Usuario final (abre incidencias)
                  'helpdesk',    -- Nivel 1 (Atención inicial y resolución básica)
                  'tic',         -- Nivel 2 (Técnicos especialistas)
                  'admin'        -- Nivel 3 (Administradores y Sistemas críticos)
                )               NOT NULL DEFAULT 'user',
  is_active     TINYINT(1)      NOT NULL DEFAULT 1,
  created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  INDEX idx_users_role (role)
) ENGINE=InnoDB;

-- =============================================================================
-- TABLA: tickets
-- Se añade `support_level` para gestionar el flujo entre departamentos
-- =============================================================================
CREATE TABLE tickets (
  id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  title           VARCHAR(200)    NOT NULL,
  description     TEXT            NOT NULL,
  status          ENUM(
                    'open',        -- Abierto
                    'in_progress', -- En curso
                    'on_hold',     -- En espera
                    'resolved',    -- Resuelto
                    'closed'       -- Cerrado
                  )               NOT NULL DEFAULT 'open',
  priority        ENUM(
                    'low',
                    'medium',
                    'high',
                    'critical'
                  )               NOT NULL DEFAULT 'medium',
  support_level   ENUM(
                    'L1',          -- Gestionado por Helpdesk
                    'L2',          -- Gestionado por TIC
                    'L3'           -- Gestionado por Admin
                  )               NOT NULL DEFAULT 'L1',
  created_by      INT UNSIGNED    NOT NULL,
  assigned_to     INT UNSIGNED        NULL DEFAULT NULL,
  attachment_path VARCHAR(500)        NULL DEFAULT NULL,
  created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolved_at     TIMESTAMP           NULL DEFAULT NULL,

  PRIMARY KEY (id),
  CONSTRAINT fk_tickets_created_by FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT fk_tickets_assigned_to FOREIGN KEY (assigned_to) REFERENCES users (id) ON DELETE SET NULL,

  INDEX idx_tickets_status (status),
  INDEX idx_tickets_support_level (support_level),
  INDEX idx_tickets_priority (priority)
) ENGINE=InnoDB;

-- =============================================================================
-- TABLA: comments (cometarios)
-- =============================================================================
CREATE TABLE comments (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  ticket_id   INT UNSIGNED  NOT NULL,
  user_id     INT UNSIGNED  NOT NULL,
  body        TEXT          NOT NULL,
  is_internal TINYINT(1)    NOT NULL DEFAULT 0,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT fk_comments_ticket FOREIGN KEY (ticket_id) REFERENCES tickets (id) ON DELETE CASCADE,
  CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =============================================================================
-- TABLA: ticket_history
-- Ahora registra tanto cambios de estado como de nivel de soporte (escalado)
-- =============================================================================
CREATE TABLE ticket_history (
  id                INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  ticket_id         INT UNSIGNED  NOT NULL,
  changed_by        INT UNSIGNED  NOT NULL,
  old_status        VARCHAR(50)       NULL,
  new_status        VARCHAR(50)       NULL,
  old_support_level VARCHAR(10)       NULL,
  new_support_level VARCHAR(10)       NULL,
  change_note       TEXT              NULL,
  changed_at        TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT fk_history_ticket FOREIGN KEY (ticket_id) REFERENCES tickets (id) ON DELETE CASCADE,
  CONSTRAINT fk_history_user FOREIGN KEY (changed_by) REFERENCES users (id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =============================================================================
-- TRIGGERS PARA AUDITORÍA
-- =============================================================================
DELIMITER $$

-- Trigger al crear: Registra el estado inicial y nivel L1
CREATE TRIGGER trg_tickets_history_on_create
AFTER INSERT ON tickets
FOR EACH ROW
BEGIN
  INSERT INTO ticket_history (ticket_id, changed_by, new_status, new_support_level, change_note)
  VALUES (NEW.id, NEW.created_by, NEW.status, NEW.support_level, 'Ticket creado e iniciado en L1');
END$$

-- Trigger al actualizar: Detecta cambio de estado O cambio de nivel (escalado)
CREATE TRIGGER trg_tickets_history_on_update
AFTER UPDATE ON tickets
FOR EACH ROW
BEGIN
  IF (OLD.status <> NEW.status) OR (OLD.support_level <> NEW.support_level) THEN
    INSERT INTO ticket_history (
      ticket_id, 
      changed_by, 
      old_status, 
      new_status, 
      old_support_level, 
      new_support_level,
      change_note
    )
    VALUES (
      NEW.id, 
      IFNULL(@current_user_id, NEW.created_by), 
      OLD.status, 
      NEW.status, 
      OLD.support_level, 
      NEW.support_level,
      CASE 
        WHEN OLD.support_level <> NEW.support_level THEN CONCAT('Escalado a ', NEW.support_level)
        ELSE 'Cambio de estado'
      END
    );
  END IF;
END$$

DELIMITER ;

-- =============================================================================
-- SEMILLAS (Datos iniciales de prueba para cada rol)
-- Password para todos: TokenTick2024! (Ejemplo de hash)
-- =============================================================================
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin Sistema', 'admin@tokentick.local', '$2b$12$KIXBcGpMVRBvTmSBX4YhRO3ywOqjdEovTGT7aQJHk0i3c7V3FQXWW', 'admin'),
('Técnico Nivel 1', 'helpdesk@tokentick.local', '$2b$12$KIXBcGpMVRBvTmSBX4YhRO3ywOqjdEovTGT7aQJHk0i3c7V3FQXWW', 'helpdesk'),
('Especialista TIC', 'tic@tokentick.local', '$2b$12$KIXBcGpMVRBvTmSBX4YhRO3ywOqjdEovTGT7aQJHk0i3c7V3FQXWW', 'tic'),
('Usuario Demo', 'user@tokentick.local', '$2b$12$KIXBcGpMVRBvTmSBX4YhRO3ywOqjdEovTGT7aQJHk0i3c7V3FQXWW', 'user');